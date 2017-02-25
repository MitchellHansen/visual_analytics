#Created by Anthony Armatas for CS 481 Visual Analytics
#Imports the randint function from random. Could have also done import random,randint
from random import randint
import copy
#The assumtion of this file is that the admin will give the datapoints, but the test
#will only create 20 graphs

class gen_two:
    @staticmethod
    def gen_Parents_And_Children_type_two(amountOfDP):
        #Python Dictionary to be returned
        the_return_dict = {}

        parentA = [None] * amountOfDP
        parentB = [None] * amountOfDP
        genList(parentA,amountOfDP)
        genList(parentB,amountOfDP)
        listOParents = []
        #Added these lists to separate the children graphs from each other for the databases
        listOClass1Childern = []
        listOClass2Childern = []
        listOChildren = [listOClass1Childern, listOClass2Childern]
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
        listOClass1Childern.append(child1)
        listOClass2Childern.append(child2)
        listOClass1Childern.append(child3)
        listOClass2Childern.append(child4)
        listOClass1Childern.append(child5)
        listOClass2Childern.append(child6)
        listOClass1Childern.append(child7)
        listOClass2Childern.append(child8)
        listOClass1Childern.append(child9)
        listOClass2Childern.append(child10)
        listOClass1Childern.append(child11)
        listOClass2Childern.append(child12)
        listOClass1Childern.append(child13)
        listOClass2Childern.append(child14)
        listOClass1Childern.append(child15)
        listOClass2Childern.append(child16)
        listOClass1Childern.append(child17)
        listOClass2Childern.append(child18)

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

        #Here adds the lists to the dictionary so they can be returned and added to the database
        the_return_dict["class1_parent"] =  listOParents[0]
        the_return_dict["class2_parent"] =  listOParents[1]
        the_return_dict["class1_children"] = listOChildren[0]
        the_return_dict["class2_children"] = listOChildren[1]

        return  the_return_dict
        #return containerOfPandC



            # for i in range(100):
       #     print "DataNum %d: %d" % (i, parentA[i])

       # print "\nDIFF BETWEEN FIRST AND SECOND\n"

       # for i in range(100):
       #     print "DataNum %d: %d" % (i, parentB[i])

    @staticmethod
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
