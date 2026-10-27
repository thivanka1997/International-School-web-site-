Add-Type -AssemblyName System.Drawing

function Convert-ToJpg($src, $dst, $quality = 88) {
  $img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
  $bmp = New-Object System.Drawing.Bitmap $img.Width, $img.Height
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $img.Width, $img.Height)
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  # .NET resolves relative paths against the process directory, not the PowerShell location
  $bmp.Save((Join-Path (Get-Location).Path $dst), $codec, $ep)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  Write-Output "Saved $dst"
}

Convert-ToJpg "media-output\img-mvq4fjk0-ac4cab8b.png" "public\images\resort_day_out.jpg"
Convert-ToJpg "media-output\img-mvq4fim9-bfb61df5.png" "public\images\balloon_game.jpg"
Convert-ToJpg "media-output\img-mvq4f8x3-1c636e93.png" "public\images\students_classroom.jpg"
Convert-ToJpg "media-output\img-mvq4ida5-2f8186b2.png" "public\images\students_garden.jpg"
Convert-ToJpg "media-output\img-mvq4ihvg-891378d9.png" "public\images\grand_steps_stage.jpg"
