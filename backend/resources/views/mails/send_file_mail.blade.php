<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Add member email</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="text-align: center; padding: 20px;">
        <h3>Bonjour, {{ $name }}</h3><br />
        <h4>{{ $email }} vient d'ajouté un ficher dans le groupe {{ $Group_name }}</h4>
        <h4>Details du fichier:</h4>
        <p>Nom => {{ $file_name }}</p>
        <p>Taile => {{ $file_size }}</p>
    </div>
</body>

</html>