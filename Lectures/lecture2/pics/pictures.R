
setwd("~/teaching/univar/Lectures/lecture2/pics/")

# darken picture

system('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert karma.jpg -fill black -colorize 70% karma2.jpg')

system('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert about_me.jpg -fill black -colorize 70% about_me2.jpg')

system('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert probability.jpeg -fill black -colorize 60% probability2.jpeg')

system('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert sets.jpg -fill black -colorize 70% sets2.jpg')

system('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert intro.jpg -fill black -colorize 70% intro2.jpg')

system('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert logic.jpg -fill black -colorize 50% logic2.jpg')


setwd("~/teaching/univar/Lectures/gif/")

system('"C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe" -i rain.mp4  -qscale:v 2 -r 20 "frames/frame-%03d.jpg"')

for (i in gsub(".jpg", "", list.files("frames")))
  system(paste0('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert frames/', i, '.jpg -fill black -colorize 60% frames/converted/', i, '.jpg'))

system('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" -delay 5 frames/converted/*.jpg rain.gif')



system('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert tide1.gif frames/frame_%03d.png')

for (i in gsub(".png", "", list.files("frames", pattern = "png"))) {
  system(paste0('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert frames/', i, '.png -fill black -colorize 60% frames/converted/', i, '.png'))
  system(paste0('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" convert frames/converted/', i, '.png -fill black -draw "rectangle 480,320,600,338" frames/converted/', i, '.png'))
}
system('"C:\\Program Files\\ImageMagick-7.0.7-Q16\\magick.exe" -delay 10 frames/converted/*.png tide.gif')
