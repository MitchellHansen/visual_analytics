#Created by Anthony Armatas for CS 481 Visual Analytics
#Imports the randint function from random. Could have also done import random,randint
from random import randint
import math
import copy
#The assumtion of this file is that the admin will give the datapoints, but the test
#will only create 20 graphs


class gen_two:

    @staticmethod
    def whiteNoise (parent_data):

        child_lists = []        
        weight = 0.10
        for x in range(9):
            
            child = []
            for i in parent_data:
		val = (i * weight) + (randint(0, 100) * (1-weight))
		val = max(min(val, 100), 0) # clamp the value [0-100]
                child.append(int(math.floor(val)))
            weight += 0.10
            child_lists.append(child)

        return child_lists

    @staticmethod
    def gen_Parents_And_Children_type_two(amountOfDP):

        parents_class1 = []
        parents_class2 = []
        children_class1 = []
        chlidren_class2 = []

        amountOfDP = int(amountOfDP)

        for i in range(amountOfDP):
            parents_class1.append(randint(5, 95))
            parents_class2.append(randint(5, 95))

        children_class1 = gen_two.whiteNoise(parents_class1)
        children_class2 = gen_two.whiteNoise(parents_class2)

        data = {}
        #Here adds the lists to the dictionary so they can be returned and added to the database
        data["class1_parent"] = parents_class1
        data["class2_parent"] = parents_class2
        data["class1_children"] = children_class1
        data["class2_children"] = children_class2

        return  data
