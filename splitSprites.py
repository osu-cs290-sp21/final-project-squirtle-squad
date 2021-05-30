from PIL import Image

#Start with single folder full of every png
#for every image in the folder

spriteSize = 64

spriteSheetPath = "./resources/gen2.png"
spriteSheet = Image.open(spriteSheetPath)
(x,y) = spriteSheet.size
pokemonWide = 16
pokemonTall = 10
leftOffset = 1
topOffset = 1

xEmpty = 1
yEmpty = 1

numPoke = int(input("How many pokemon "))
for i in range(int(y/spriteSize)):
    for j in range(int(x/spriteSize)):
        if (i*pokemonWide+j) >= numPoke:
            break
        #Split the image into the four sections
        sprite = spriteSheet.crop(box=[j*spriteSize+leftOffset+(xEmpty*j),i*spriteSize+topOffset+(yEmpty*i),(j+1)*spriteSize-0+leftOffset+(xEmpty*j),(i+1)*spriteSize+topOffset++(yEmpty*i)])

        targetDir = "./resources/sprites/"
        #DO THE FILE SAVING HERE
        sprite.save(targetDir + str(i*pokemonWide+j+1+151) + ".png")