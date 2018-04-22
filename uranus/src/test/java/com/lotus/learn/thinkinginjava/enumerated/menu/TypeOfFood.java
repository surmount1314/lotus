//: enumerated/menu/TypeOfFood.java
package com.lotus.learn.thinkinginjava.enumerated.menu;
import com.lotus.learn.thinkinginjava.enumerated.menu.Food.Appetizer;
import com.lotus.learn.thinkinginjava.enumerated.menu.Food.Coffee;
import com.lotus.learn.thinkinginjava.enumerated.menu.Food.Dessert;
import com.lotus.learn.thinkinginjava.enumerated.menu.Food.MainCourse;

public class TypeOfFood {
  public static void main(String[] args) {
    Food food = Appetizer.SALAD;
    food = MainCourse.LASAGNE;
    food = Dessert.GELATO;
    food = Coffee.CAPPUCCINO;
  }
} ///:~
