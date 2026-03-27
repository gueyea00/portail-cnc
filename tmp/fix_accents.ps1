$replacements = @{
    "Ã©" = "é"
    "Ã " = "à"
    "Ã¨" = "è"
    "Ãª" = "ê"
    "Ã¢" = "â"
    "Ã´" = "ô"
    "Ã»" = "û"
    "Ã®" = "î"
    "Ã¯" = "ï"
    "Ã¹" = "ù"
    "Ã§" = "ç"
    "Ã«" = "ë"
    "Ã€" = "À"
    "Ã‰" = "É"
    "Â«" = "«"
    "Â»" = "»"
    "â€”" = "—"
    "â€¢" = "•"
    "Ã " = "à"
    "Ã‰" = "É"
}

Get-ChildItem -Path "c:\Users\inzue\Downloads\cnc_tchad\cnc-connect-hub\src" -Include "*.tsx", "*.ts" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    Set-Content $_.FullName $content -Encoding UTF8
}
