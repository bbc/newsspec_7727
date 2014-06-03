<div class="introduction">

	<noscript>
		<img class="introduction-image" src="<%= obj.pathStatic %>/<%= obj.vocab_dir %><%= introduction_image_src %>" alt="<%= introduction_image_alt %>" width="620" height="360"  />
	</noscript>
	<div class="delayed-image-load introduction-image" data-src="<%= obj.pathStatic %>/<%= obj.vocab_dir %><%= introduction_image_src %>" data-width="620" style="width: 100%;" data-alt="<%= introduction_image_alt %>"></div> 

	<div class="introduction-textwrapper">

		<div class="introduction-textwrapper__text">
			
			<h2><%= introduction_headline %></h2>

			<p><%= introduction_blurb %></p>
			
			<div class="introduction-textwrapper__launcher_icon"></div>
		</div>
	</div>

</div>