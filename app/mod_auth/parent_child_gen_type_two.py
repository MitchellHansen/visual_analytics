#Created by Anthony Armatas for CS 481 Visual Analytics
#Imports the randint function from random. Could have also done import random,randint
from random import randint
import copy
#The assumtion of this file is that the admin will give the datapoints, but the test
#will only create 20 graphs


def gen_Parents_And_Children_type_two(amountOfDP):
    parentA = [None] * amountOfDP
    parentB = [None] * amountOfDP
    genList(parentA,amountOfDP)
    genList(parentB,amountOfDP)
    listOParents = []
    listOChildren = []
    containerOfPandC = [listOParents,listOChildren]
    listOParents.append(parentA)
    listOParents.append(parentB)

    child1 = copy.deepcopy(parentA)
    child3 = copy.deepcopy(parentA)
    child5 = copy.deepcopy(parentA)
    child7 = copy.deepcopy(parentA)
    child9 = copy.deepcopy(parentA)
    child11 = copy.deepcopy(parentA)
    child13 = copy.deepcopy(parentA)
    child15 = copy.deepcopy(parentA)
    child17 = copy.deepcopy(parentA)

    child2 = copy.deepcopy(parentB)
    child4 = copy.deepcopy(parentB)
    child6 = copy.deepcopy(parentB)
    child8 = copy.deepcopy(parentB)
    child10 = copy.deepcopy(parentB)
    child12 = copy.deepcopy(parentB)
    child14 = copy.deepcopy(parentB)
    child16 = copy.deepcopy(parentB)
    child18 = copy.deepcopy(parentB)
    listOChildren.append(child1)
    listOChildren.append(child2)
    listOChildren.append(child3)
    listOChildren.append(child4)
    listOChildren.append(child5)
    listOChildren.append(child6)
    listOChildren.append(child7)
    listOChildren.append(child8)
    listOChildren.append(child9)
    listOChildren.append(child10)
    listOChildren.append(child11)
    listOChildren.append(child12)
    listOChildren.append(child13)
    listOChildren.append(child14)
    listOChildren.append(child15)
    listOChildren.append(child16)
    listOChildren.append(child17)
    listOChildren.append(child18)

    evenOddCounter = 1;
    noisePercentFactor = .10
    for i in range(len(listOChildren)):
        if evenOddCounter == 1:
            whiteNoise(listOChildren[i], amountOfDP, noisePercentFactor)
            evenOddCounter += 1
        else:
            whiteNoise(listOChildren[i], amountOfDP, noisePercentFactor)
            evenOddCounter -= 1
            noisePercentFactor += .10

    return containerOfPandC



        # for i in range(100):
   #     print "DataNum %d: %d" % (i, parentA[i])

   # print "\nDIFF BETWEEN FIRST AND SECOND\n"

   # for i in range(100):
   #     print "DataNum %d: %d" % (i, parentB[i])


def genList(dLst,amountOfDP):
    for i in range(amountOfDP):
        dataPnt = randint(0, amountOfDP)
        dLst[i] = dataPnt
    return dLst



def whiteNoise (childList,amountOfDP, noisePercentFactor):
    classVectorPercent = 1 - noisePercentFactor
    for i in range(amountOfDP):
        child_noise_array = [None] * len(childList)
        for j in range(len(childList) ):
            child_noise_array[j] = (randint(3, 10)) * noisePercentFactor

        childList[i] = (childList[i] * classVectorPercent) + child_noise_array[i]




#gen_Parents_And_Children_type_two(100)
