from PIL import Image

#Planned file format: ID_NAME.png, if shiny append the _s

#If True, will save using pokemon name, otherwise will use the id
USE_NAME = FALSE

#This is the directory where all the of spriteSheets are
sourceDir = ""

#This is the idrectory where the folders with all of the split up sprites should be
targetDir = ""

#Start with single folder full of every png

#for every image in the folder
for (dirpath,dirnames,filenames) in walk(sourceDir):
    for fileName in filenames:
        fileName = fileName[:-4]
        details = fileName.parse("_")
        pokeID = details[0]
        pokeName = details[1]


        #Open the image
        spriteSheet = Image.open(fileName)

        #TODO: See if I can add an alpha channel and clean the background if not already clean

        #Split the image into the four sections
        frontSprite = spriteSheet.crop(box=[0,0,64,64])
        frontSpriteShiny = spriteSheet.crop(box=[65,0,128,64])
        backSprite = spriteSheet.crop(box=[129,0,192,64])
        backSpriteShiny = spriteSheet.crop(box=[193,0,256,64])

        #Save the images to the correct folder
        newName = ""
        if(USE_NAME):
            newName = pokeName
        else:
            newName = pokeID

        #DO THE FILE SAVING HERE
        frontSprite.save(targetDir + newName + "_front.png")
        frontSpriteShiny.save(targetDir + newName + "_front_2.png")
        backSprite.save(targetDir + newName + "_back.png")
        backSpriteShiny.save(targetDir + newName + "_back_2.png")