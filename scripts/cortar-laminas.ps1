# Corta las láminas de referencias/diseno/laminas en tramos verticales numerados
# y los guarda en referencias/diseno/cortes (home-01.png, ficha-01.png, guia-01.png...).
# Uso (desde la raíz del proyecto):  powershell -ExecutionPolicy Bypass -File scripts/cortar-laminas.ps1

param(
  [int]$Alto = 1800,        # alto de cada tramo en px
  [int]$Solapamiento = 120  # px que se repiten entre un tramo y el siguiente
)

Add-Type -AssemblyName System.Drawing

$raiz = Split-Path -Parent $PSScriptRoot
$origen = Join-Path $raiz "referencias\diseno\laminas"
$destino = Join-Path $raiz "referencias\diseno\cortes"
New-Item -ItemType Directory -Force $destino | Out-Null

$laminas = @{
  "01-home-movil-3x.png"               = "home"
  "02-ficha-caja-surtida-movil-3x.png" = "ficha"
  "03-guia-de-estilo-2x.png"           = "guia"
}

foreach ($archivo in $laminas.Keys) {
  $ruta = Join-Path $origen $archivo
  if (-not (Test-Path $ruta)) { Write-Warning "No existe $ruta"; continue }

  $img = [System.Drawing.Bitmap]::FromFile($ruta)
  $paso = $Alto - $Solapamiento
  $n = 0
  for ($y = 0; $y -lt $img.Height; $y += $paso) {
    $n++
    $h = [Math]::Min($Alto, $img.Height - $y)
    $rect = New-Object System.Drawing.Rectangle 0, $y, $img.Width, $h
    $tramo = $img.Clone($rect, $img.PixelFormat)
    $nombre = "{0}-{1:D2}.png" -f $laminas[$archivo], $n
    $tramo.Save((Join-Path $destino $nombre), [System.Drawing.Imaging.ImageFormat]::Png)
    $tramo.Dispose()
    Write-Output ("{0}  y={1}..{2}  ({3} x {4})" -f $nombre, $y, ($y + $h), $img.Width, $h)
    if ($y + $h -ge $img.Height) { break }
  }
  $img.Dispose()
}
