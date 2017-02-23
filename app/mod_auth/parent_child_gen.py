#Created by Anthony Armatas for CS 481 Visual Analytics
#Imports the randint function from random. Could have also done import random,randint
from random import randint
import copy



def gen_Parents_And_Children(section_variation, white_noise_var, amountOfDP):
    parentA = [None] * amountOfDP
    parentB = [None] * amountOfDP
    genList(parentA,amountOfDP)
    genList(parentB,amountOfDP)
    listOParents = []
    listOChildren = []
    containerOfPandC = [listOParents,listOChildren]
    listOParents.append(parentA)
    listOParents.append(parentB)

    sectionLen = amountOfDP/4

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

    for i in range(len(listOChildren)):
        firstSec = randint(0, (amountOfDP / 2) - 1)
        secondSec = firstSec + sectionLen
        manipulateSections(firstSec, secondSec, listOChildren[i], sectionLen, section_variation)
        whiteNoise(listOChildren[i], white_noise_var, amountOfDP)

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

def manipulateSections (secOne, secTwo, childList, sectionLen, manipAmount):
    for i in range(0, sectionLen):
        if childList[secOne + i] + manipAmount > 100:
            childList[secOne + i] = 100
        else:
            childList[secOne + i] += manipAmount
    for i in range(0, sectionLen):
        if childList[secTwo + i] + manipAmount > 100:
            childList[secTwo + i] = 100
        else:
            childList[secTwo + i] += manipAmount


def whiteNoise (childList,wNoiseVal,amountOfDP):
    for i in range(amountOfDP):
        if childList[i] + wNoiseVal > 100:
            childList[i] = 100
        else:
            childList[i] += wNoiseVal




#gen_Parents_And_Children(20, 5, 100)
