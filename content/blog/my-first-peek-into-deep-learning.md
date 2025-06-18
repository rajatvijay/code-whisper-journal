---
title: My First Peek into Deep Learning (And It Wasn't That Scary)
excerpt: Following the fast.ai course and sharing my journey into deep learning in plain English — from neural networks to avoiding overfitting.
date: 2024-03-20
readingTime: 8 # minutes
categories:
  - Deep Learning
---

# My First Peek into Deep Learning (And It Wasn't That Scary)

I recently worked through the fast.ai course _Practical Deep Learning for Coders_ and the first chapter of the companion book _Deep Learning for Coders with fastai and PyTorch_.  
Below is the distilled story — in plain English — of what I learned and why deep learning felt far less intimidating than expected.

---

## Learning AI Is Part Science, Part Craft

The most challenging aspect of deep learning is seldom the mathematics or the code.  
Instead, the real work lies in:

- verifying that you have the **right data**,
- checking whether the model is truly **learning**, and
- deciding **what to change** when it is not.

Iteration, observation and judgement play a larger role than pure theory.

---

## What Is Deep Learning?

> **Machine Learning**: Training a computer with examples so it discovers patterns without explicit rules.  
> **Deep Learning**: A branch of machine learning that stacks many processing layers (“neurons”) so each layer refines the representation learned by the previous one.

In practice, you show the computer thousands of labelled examples (for instance, images of cats) and let it uncover what “cat-ness” looks like.

---

## The Role of Weights

Computers begin as blank slates. During training they adjust internal parameters called **weights**.  
Each adjustment is a small step toward predictions that better fit the examples you provided.

---

## Results versus Performance

Consider an AI agent playing checkers:

- **Result** – the move it selects.
- **Performance** – whether that move increases its chance of winning.

Both matter: impressive moves without wins are as useless as wins produced by illegal moves.

---

## A Mini-Glossary

- **Architecture** – the overall layout of layers in the network.
- **Weights** – numerical parameters altered during learning.
- **Loss** – a score indicating how far predictions deviate from the desired answers.
- **Metric** – a human-interpretable score (accuracy, F1, etc.) used to track progress.
- **Predictions** – the model’s outputs for new inputs.
- **Independent variables** – the raw input features.
- **Labels** – the correct answers supplied during training.

Training seeks to _lower loss_ while _raising the chosen metric_.

---

## Classification versus Regression

| Task Type      | Goal                            | Example                              |
| -------------- | ------------------------------- | ------------------------------------ |
| Classification | Choose a **category**           | Dog, cat or rabbit?                  |
| Regression     | Predict a **continuous number** | Tomorrow’s maximum temperature in °C |

Note that “regression” here is a broad term — not limited to linear regression.

---

## Overfitting: When a Model Becomes Too Smart

**Overfitting** occurs when a model memorises the training set and fails on new data.  
Typical warning sign: high training accuracy paired with noticeably lower validation accuracy.

---

## How Neural Networks Learn

The standard learning loop is **Stochastic Gradient Descent** (SGD):

1. Make a prediction.
2. Measure how wrong it is (loss).
3. Adjust weights slightly to reduce that loss.
4. Repeat.

---

## Transfer Learning and Fine-Tuning

Instead of starting from scratch, you can begin with a **pre-trained model**:

- **Transfer Learning** – applying a model trained on one task to a related task.
- **Fine-Tuning** – continuing training on your own data to adapt the model further.

This often delivers strong performance with far less data and computation.

---

## Segmentation: Pixel-Level Understanding

When the goal is to label every pixel (e.g., “dog’s ear” versus “background”), the task is called **image segmentation** — another capability powered by deep learning.

---

## Validation and Test Sets

Always hold back a **validation set** to gauge how well your model generalises during development.  
After tuning is complete, evaluate once on a **test set** to obtain an unbiased final score.

---

## Practical Tips

1. Search liberally; online resources accelerate learning.
2. Accept partial understanding early on and revisit later.
3. Build small, personal projects to cement concepts.
4. Follow your curiosity; motivation fuels perseverance.
5. Treat experiments as play — dead ends are part of the process.

---

## Closing Thoughts

Deep learning rewards curiosity and iteration more than innate brilliance.  
Start with a manageable problem, keep refining, and let each experiment inform the next.  
With patience and deliberate practice, what first appears daunting soon becomes approachable.
