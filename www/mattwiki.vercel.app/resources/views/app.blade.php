<!DOCTYPE html>
<html lang="en" class="dark font-sans">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title inertia>{{ config('app.name') }}</title>
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" /></noscript>
  @if(isset($page['props']['settings']['primary_l']))
  <style>
    .dark {
      --primary: oklch(
        {{ $page['props']['settings']['primary_l'] }}
        {{ $page['props']['settings']['primary_chroma'] }}
        {{ $page['props']['settings']['primary_hue'] }}
      );
    }
  </style>
  @endif
  @viteReactRefresh
  @vite(['resources/css/app.css', 'resources/js/app.tsx'])
  @inertiaHead
</head>
<body class="antialiased">@inertia</body>
</html>
