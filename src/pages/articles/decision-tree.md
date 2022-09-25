---
title: Introduction to Decision Tree
tags: [algorithm]
date: 2019-10-25
---

# Intro 
When solving the problem of classifying data into different groups, the most basic way to think about is to repeat multiple if~ else~ statements. If the weather is nice, it's a good day to play if it's not a weekday! You can think like However, if~ else~ code that correctly classifies enough data is difficult to write directly.

 Decision tree can be said to be an algorithm that automatically creates such if-else- statements. For example, let's see what conditions can successfully classify heart disease when we have the following data:

| Chest Pain | Good Blood Circulation | Blocked Arteries | Heart Disease |
| ---------- | ---------------------- | ---------------- | ------------- |
| NO         | NO                     | NO               | NO            |
| YES        | YES                    | YES              | YES           |
| YES        | YES                    | NO               | NO            |
| YES        | NO                     | NO               | YES           |
| etc..      | etc..                  | etc..            | etc..         |



Ultimately, the goal is to create a tree like the one below. The leafs of the tree represent the number of YES / NO.

![tree](https://i.ibb.co/zHC60Zy/1569549456005.png)

The problem is that the process of creating such a tree is more difficult than you think. There are problems such as why did we use Weather first instead of classifying based on Wind or Humidity first? A detailed explanation of this can be found in [this video](https://www.youtube.com/user/joshstarmer/search?query=Decision+Tree).

# Algorithm
A brief summary of the algorithm is given below.

1. Create a binary tree with one variable (Column).
2. Evaluate which variable best classifies data using indicators such as Gini index and entropy. (Example uses Gini index)
3. Iterates over the leaf of the tree and ends when the index becomes optimal.


## 1. Create a binary tree with one variable (Column).

![](https://i.ibb.co/gV6PcYL/1569487506732.png)
- First, we try binary classification with only one variable.
- Create a tree with binary classification for each variable.


![](https://i.ibb.co/LRjvgfv/1569487637982.png)


- Each sum may be different because there may be missing values.
- Each leaf is impure because no node has a leaf with 100% result.
- In order to judge which classification is best, we need a measure of impurity.
	- **Gini index** 

## 2.  Evaluate which variable best classifies data using indicators such as Gini index and entropy.

### Gini index
- The lower the better.
- Easy to calculate.

First, calculating the Gini index for chest pain is as follows.
![](https://i.ibb.co/yq13FPc/1569485863162.png)
$$
\begin{align}
	\text{For left leaf, the Gini impurity} 
	&= 1 - (\text{the probability of "yes"})^2 - (\text{the probability of "no"})^2\\
	&= 1 - (\frac{105}{105+39})^2 - (\frac{105}{105+39})^2						   \\
	&= 0.395
\end{align}
$$

$$
\begin{align} 
	\text{For right leaf, the Gini impurity}
	&= 1 - (\text{the probability of "yes"})^2 - (\text{the probability of "no"})^2 \\
	&= 1 - (\frac{34}{34+125})^2 - (\frac{125}{34+125})^2						    \\
	&= 0.336
\end{align}
$$

## 3. Iterates over the leaf of the tree and ends when the index becomes optimal.
- Next, calculate the Gini index of the entire tree.
- Since the size of each leaf is different, the overall gini index should be a weighted average of the gini index.

$$
\begin{align} 
	\text{Gini impurity for Chest Pain} &= \text{weighted average of Gini impurities for the leaf node}\\
	&= (\frac{144}{144+159}) \times 0.395 + (\frac{159}{144+159}) \times 0.336 \\
	&= 0.364
\end{align}
$$
- Repeat the same process for each leaf.
- Comparing the gini index after separation with the gini index before separation, it is determined whether the algorithm is finished.

# Applications
## Numeric data
1. Sort by numeric data
2. Find the average between (Refer to the picture below)
3. Calculate the impurity value at each mean.
4. Hit the branch at the best impurity value.


![](https://i.ibb.co/2nptTwT/1569488629706.png)

## Ranked data 
- Classify value based on less equal 

## Multi class 
- choice A , choice B, choice C, choice A or B, choice B or C, choice C or A  

# Pros and Cons
## Pros
- It is a relatively intuitive and simple algorithm.
- Unlike other models, the classification criteria of samples can be clearly known.

## Cons
- In fact, Decision Tree alone does not give such good performance.
- It's great for classifying the data set itself, but it's not very good at classifying new samples.
  - This can be solved using **Random Forest**, and there are real cases.

# Reference
1. [Using Gini-index for Feature Weighting in Text Categorization](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.353.3216&rep=rep1&type=pdf)
