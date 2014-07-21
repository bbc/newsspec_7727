<div class="carousel_small_container">

	<div class="carousel_nav_container carousel_nav_container--small">
		<button class="carousel_nav carousel_nav--prev">&lt;</button>
		<button class="carousel_nav carousel_nav--next">&gt;</button>
	</div>

	<ul class="carousel_small">

		<%
			var panelNumber = 1;

			while (true) {

				if (!getProperty(panelNumber, 'thumb_caption')) {
					break;
				}
		%>

			<li class="carousel_small__item" style="background: url(<%= obj.pathStatic %>/<%= obj.vocab_dir %><%= getProperty(panelNumber, 'thumb_image') %>)">
				<a class="carousel_small__item-link" href="#">
					<span class="carousel_small__item-caption">
						<%= getProperty(panelNumber, 'thumb_caption') %>
					</span>
				</a>
			</li>

		<%
			panelNumber++;
		}
		%>
		
	</ul>
</div>

<%
	function getProperty (panelNumber, property) {
		var retrieved = obj['panels_' + panelNumber + '_'+ property];
		if (retrieved === undefined || retrieved === 'FALSE') {
			return false;
		}
		return retrieved;
	}
%>