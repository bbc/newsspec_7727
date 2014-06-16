(function () {

    var IframeWatcher = function (linkId) {
        if (this.istatsCanBeUsed()) {
            this.addIstatsDependency(linkId);
        }
        else {
            this.createIframe(linkId);
        }
        this.updateSizeWhenWindowResizes();
    };

    IframeWatcher.prototype = {
        istatsCanBeUsed: function () {
            return ('require' in window) && this.onBbcDomain();
        },
        addIstatsDependency: function (linkId) {
            var iframeWatcher = this;
            require(['istats-1'], function (istats) {
                iframeWatcher.istats = istats;
                iframeWatcher.createIframe(linkId);
            });
        },
        updateSizeWhenWindowResizes: function () {
            var iframeWatcher = this;
            window.addEventListener('resize', function () {
                iframeWatcher.setDimensions();
            }, false);
        },
        data: {},
        istatsQueue: [],
        updateFrequency: 32,
        createIframe: function (linkId) {

            var link         = document.getElementById(linkId),
                href         = link.href,
                token        = link.parentNode.className,
                staticHeight = link.getAttribute('data-static-iframe-height'),
                iframeWatcher = this,
                hostId        = this.getWindowLocationOrigin(),
                urlParams     = window.location.hash || '',
                onBBC         = this.onBbcDomain();
            
            if (this.hostIsNewsApp(token)) {
                hostId = token;
            }

            this.elm = document.createElement('iframe');
            this.elm.className = 'responsive-iframe';
            this.elm.style.width = '100%';
            this.elm.scrolling = 'no';
            this.elm.allowfullscreen = true;
            this.elm.frameBorder = '0';

            this.decideHowToTalkToIframe(href);

            this.elm.src = href + '?hostid=' + hostId.split('//')[1] + '&onbbcdomain=' + onBBC + urlParams;

            link.parentNode.appendChild(this.elm);
            link.parentNode.removeChild(link);

            this.lastRecordedHeight = this.elm.height;
            this.iframeInstructionsRan = false;

            this.handleIframeLoad(function startIframing() {
                iframeWatcher.getAnyInstructionsFromIframe();
                iframeWatcher.setDimensions();
            });

        },
        handleIframeLoad: function (startIframing) {
            // IMPORTANT: Had to make this an onload because the 
            // polyfilling and jquery on one page causes issues
            window.addEventListener('load', function () {
                startIframing();
            }, true);
            if (this.elm.onload) {
                this.elm.onload = startIframing;
            }
            // Bug in IE7 means onload doesn't fire when an iframe 
            // loads, but the event will fire if you attach it correctly
            else if ('attachEvent' in this.elm) {
                this.elm.attachEvent('onload', startIframing);
            }
        },
        decideHowToTalkToIframe: function (href) {
            if (window.postMessage) { // if window.postMessage is supported, then support for JSON is assumed
                var uidForPostMessage = this.getPath(href);
                this.uidForPostMessage = this.getPath(href);
                this.setupPostMessage(uidForPostMessage);
            }
            else if (href.search(window.location.protocol + '//' + window.location.hostname) > -1) {
                this.setupIframeBridge();
            }
            else {
                this.data.height = staticHeight;
                this.elm.scrolling = 'yes';
            }
        },
        onBbcDomain: function () {
            return window.location.host.search('bbc.co') > -1;
        },
        setupPostMessage: function (uid) {
            var iframeWatcher = this;
            window.addEventListener('message', function (e) {
                iframeWatcher.postMessageCallback(e.data);
            }, false);
        },
        postMessageCallback: function (data) {
            if (this.postBackMessageForThisIframe(data)) {
                this.processCommunicationFromIframe(
                    this.getObjectNotationFromDataString(data)
                );
                if (this.istatsInTheData()) {
                    this.addToIstatsQueue();
                    this.emptyThisIstatsQueue(this.istatsQueue);
                }
            }
        },
        postBackMessageForThisIframe: function (data) {
            return data && (data.split('::')[0] === this.uidForPostMessage);
        },
        getObjectNotationFromDataString: function (data) {
            return JSON.parse(data.split('::')[1]);
        },
        istatsInTheData: function () {
            return this.data.istats && this.data.istats.actionType;
        },
        addToIstatsQueue: function () {
            this.istatsQueue.push({
                'actionType': this.data.istats.actionType,
                'actionName': this.data.istats.actionName,
                'viewLabel':  this.data.istats.viewLabel
            });
        },
        setupIframeBridge: function () {
            var iframeWatcher = this;
            window.setInterval(function () {
                iframeWatcher.iFrameBridgeCallback();
            }, iframeWatcher.updateFrequency);
        },
        iFrameBridgeCallback: function () {
            if (this.elm.contentWindow.iframeBridge) {
                this.processCommunicationFromIframe(this.elm.contentWindow.iframeBridge);
                this.emptyThisIstatsQueue(this.elm.contentWindow.istatsQueue);
            }
        },
        processCommunicationFromIframe: function (data) {
            this.data = data;
            this.setDimensions();
            this.getAnyInstructionsFromIframe();
        },
        istatsQueueLocked: false,
        emptyThisIstatsQueue: function (queue) {
            var istatCall;
            if (this.istats && queue) {
                this.istatsQueueLocked = true;
                for (var i = 0, len = queue.length; i < len; i++) {
                    istatCall = queue.pop();
                    this.istats.log(istatCall.actionType, istatCall.actionName, {'view': istatCall.viewLabel});
                }
                this.istatsQueueLocked = false;
            }
        },
        hostIsNewsApp: function (token) {
            return (token.indexOf('bbc_news_app') > -1);
        },
        getIframeContentHeight: function () {
            if (this.data.height) {
                this.lastRecordedHeight = this.data.height;
            }
            return this.lastRecordedHeight;
        },
        setDimensions: function () {
            this.elm.width  = this.elm.parentNode.clientWidth;
            this.elm.height = this.getIframeContentHeight();
        },
        getAnyInstructionsFromIframe: function () {
            if (
                this.data.hostPageCallback &&
                (!this.iframeInstructionsRan)
            ) {
                /* jshint evil:true */
                eval('var func = ' + this.data.hostPageCallback);
                func();
                this.iframeInstructionsRan = true;
            }
        },
        getPath: function (url) {
            var urlMinusProtocol = url.replace('http://', '');
            return urlMinusProtocol.substring(urlMinusProtocol.indexOf('/')).split('?')[0];
        },
        getWindowLocationOrigin: function () {
            if (window.location.origin) {
                return window.location.origin;
            }
            else {
                return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }
        }
    };

    var iframe = new IframeWatcher('<%= iframeUid %>');

})();
