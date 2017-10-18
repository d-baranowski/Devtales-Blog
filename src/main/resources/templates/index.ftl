<html>
<head>
    <title>Devtales</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <#if isAdmin>
        <div id="ophf4efwilur480us"></div>
    </#if>
    <div id="mount">${ content }</div>

    <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${ state };
    </script>
    <script type="text/javascript" src="/js/bundle.js"></script>
</body>
</html>