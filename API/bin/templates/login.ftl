<!DOCTYPE html>
<html lang="en">
<head>
    <title>Log in with your account</title>
</head>

<body>

<div class="container">

    <form method="POST" action="login" class="form-signin">
        <h2 class="form-heading">Log in</h2>

        <div class="form-group">
            <input name="username" type="text" class="form-control" placeholder="Username"
                   autofocus="true"/>
            <input name="password" type="password" class="form-control" placeholder="Password"/>

            <span>${ error!"" }</span>

            <button class="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
        </div>
    </form>

</div>
</body>
</html>
