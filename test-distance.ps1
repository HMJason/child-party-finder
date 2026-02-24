$body = Invoke-WebRequest -Uri "http://localhost:3000/api/providers?userLat=51.4825&userLng=-0.0135&radius=5" -UseBasicParsing
Write-Output $body.Content
