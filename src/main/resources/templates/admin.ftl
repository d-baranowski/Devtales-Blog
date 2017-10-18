<html>
<head>
    <title>Devtales</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/css/Draft.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <div id="content"></div>
    <#if state??>
    <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${ state };
    </script>
    </#if>
    <script type="text/javascript" src="/js/admin-bundle.js"></script>
</body>
</html>