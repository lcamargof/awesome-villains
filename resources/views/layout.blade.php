<!doctype html>
<html lang="es" data-framework="backbonejs">
	<head>
		<!-- Charset -->
		<meta charset="utf-8">
		<!-- Viewport -->
		<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width">
		<!-- Descrition -->
		<title>awesomeVillains - @yield('title')</title>
		<meta name="description" content="awesomeVillains! - backbone y laravel test">
		<!-- CSS Assets -->
		@section('css')
			<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700,900' rel='stylesheet' type='text/css'>
			<link rel="stylesheet" href="./css/bootstrap.min.css">
			<link rel="stylesheet" href="./css/font-awesome/css/font-awesome.min.css">
			<link rel="stylesheet" href="./css/style.css">
		@show
	</head>
	<body>
		@section('header')
			<!-- Solo una página, la sección es por ser precavido  -->
			<section id="header" class="text-center">
				<div class="background-overlay"></div>
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<h1 class="header-title"><span class="subtitle">awesome</span><span class="v-letter">V</span>illains</h1>
							<hr class="v-hr">
							<p>Si tu awesomeVillain no está en la lista, <a href="#" class="v-link" id="add-villain">¡AGREGALO!</a> y contribuye a que la lista sea más malvada</p>
						</div>
					</div>
				</div>
			</section>
		@show

		<div class="container">
			<!-- Contenido de la página -->
			@yield('content')

			<!-- footer, estatico -->
	      <footer>
				<div class="row">
					<div class="col-md-12">
						<p class="text-center">Desarrollado por Luis Camargo - <span>awesomeVillain #1</span> - 2015</p>
					</div>
				</div>
	      </footer>
		</div>
		
		@section('js')
			<script data-main="js/main" src="js/libs/require/require.js"></script>
		@show
	</body>
</html>