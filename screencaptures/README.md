Make a GIF from an MOV File
=========================================

1. Install [ffmpeg](https://ffmpeg.org/) and [gifsicle](https://www.npmjs.com/package/gifsicle)
```brew install ffmpeg
brew install gifsicle```
2. Convert MOV file into a series of PNG files
- Run terminal commands from within source.mov directory
```mkdir pngFolder
ffmpeg -i source.mov -r 10 ./pngFolder/out%04d.png ```
3. Navigate to `pngFolder` and convert PNG files to GIFs
```
cd pngFolder
mkdir converted
for i in *.png; do sips -s format gif $i --out converted/$i.gif;donettrtgcd
```
4. Navigate to `converted` folder and stitch files together
```gifsicle --optimize=3 --delay=3 --loopcount *.gif > animation.gif```


### Additional Information
[Convert a Mov to a GIF like a boss](http://chrismessina.me/b/13913393/mov-to-gif)
[Converting Image File Formats with the Command Line & sips](http://osxdaily.com/2013/01/11/converting-image-file-formats-with-the-command-line-sips/)
