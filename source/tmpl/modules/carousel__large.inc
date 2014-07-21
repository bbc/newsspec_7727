<div class="carousel_large_container">

	<div class="carousel_nav_container carousel_nav_container--large">
		<button class="carousel_nav carousel_nav--prev">&lt;</button>
		<button class="carousel_nav carousel_nav--next">&gt;</button>
	</div>

	<ul class="carousel_large">

		<%
			var panelNumber = 1;

			while (true) {

				if (!getProperty(panelNumber, 'panel_title')) {
					break;
				}
		%>

			<li class="carousel_large__item">

				<div class="carousel_large__item-textwrapper">
					<h2 class="carousel_large__item-heading"><%= getProperty(panelNumber, 'panel_title') %></h2>

					<div class="carousel_large__item-text">
						<p><%= getProperty(panelNumber, 'panel_text') %></p>
					</div>
				</div>

				<div class="carousel_large__item-media">

					<% 
					if (getProperty(panelNumber, 'panel_map')) { 
					%>
						<a class="carousel_large__item-media__playlist" href="<%= getProperty(panelNumber, 'panel_map_page') %>" data-playlist="<%= getProperty(panelNumber, 'panel_map_playlist') %>" data-holding-image="<%= obj.pathStatic %>/<%= obj.vocab_dir %><%= getProperty(panelNumber, 'panel_image_src')%>">
							<% renderImage(panelNumber) %>
						</a>
					<%
					} else {
						renderImage(panelNumber);
					}
					%>

				</div>

			</li>
		
		<%
				panelNumber++;
			}
		%>
		
	</ul>

</div>

<%
	function renderImage(panelNumber) {
%>
	<noscript>
		<img class="carousel_large__item-media__image" src="<%= obj.pathStatic %>/<%= obj.vocab_dir %><%= getProperty(panelNumber, 'panel_image_src') %>" alt="<%= getProperty(panelNumber, 'panel_image_alt') %>" width="620" height="360"  />
	</noscript>

	<div class="delayed-image-load carousel_large__item-media__image" data-src="<%= obj.pathStatic %>/<%= obj.vocab_dir %><%= getProperty(panelNumber, 'panel_image_src') %>" data-width="620" style="width: 100%;" data-alt="<%= getProperty(panelNumber, 'panel_image_alt')%>"></div> 
	
	<% if(getProperty(panelNumber, 'panel_map_overlay')) { %>
		<div class="carousel_large__item-media__image_overlay--<%= getProperty(panelNumber, 'panel_map_overlay') %>"></div>
	<% } %>
<%
	}
%>

<%
	function getProperty (panelNumber, property) {
		var retrieved = obj['panels_' + panelNumber + '_'+ property];
		if (retrieved === undefined || retrieved === 'FALSE') {
			return false;
		}
		return retrieved;
	}
%>