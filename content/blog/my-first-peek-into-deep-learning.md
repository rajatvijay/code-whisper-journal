---
title: "My First Peek into Deep Learning (And It Wasn't That Scary)"
excerpt: "Following the fast.ai course and sharing my journey into deep learning in plain English - from neural networks to avoiding overfitting."
date: "2024-03-20"
readTime: "8 min read"
tags: ["Deep Learning", "AI", "Machine Learning", "Beginner", "Fast.ai"]
author:
  name: "Rajat Vijay"
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
---

# 🤖 My First Peek into Deep Learning (And It Wasn't That Scary)

So, I finally took the plunge and started learning deep learning — you know, the kind of AI behind cool stuff like self-driving cars, face recognition, and "this product is recommended for you" on shopping sites.

I followed the fast.ai course *Practical Deep Learning for Coders* and read the first chapter of their book *Deep Learning for Coders with fastai and PyTorch*. Here's me, trying to make sense of it all — and sharing the journey with you in plain English.

## 🎨 Learning AI Isn't Just Coding — It's Kinda Like Art

✅ One of the first things I learned is that the hardest part of deep learning isn't always the math or writing code — it's figuring out if you have the **right data**, if your model is learning **correctly**, and what to do **if it's not**. It's messy. It's trial and error. It's part science, part craft.

## 🧠 What Is Deep Learning Anyway?

Let's break it down:

✅ Deep learning is a part of a bigger field called *machine learning*.

❗**Machine Learning**: Teaching a computer to learn from examples instead of telling it what to do step-by-step.

Think of it like this: You don't tell the computer all the rules to recognize a cat. You just **show it lots of cat pictures**, and it figures out what a cat looks like.

✅ Deep learning does this using **layers** of "neurons" (not real ones — just math functions!) that pass data along, learning a little more at each step. Thanks to better computers and lots of data, this has become possible in recent years.

## 🧾 Computers Aren't Geniuses — They Just Learn Fast

✅ Computers aren't smart on their own. They're actually kind of dumb — unless you tell them *exactly* what to do.

But machine learning changes that. It teaches the computer to *learn from experience*. That means the computer tries something, checks if it worked, and adjusts itself to do better next time.

❗**Weights**: These are the dials or sliders inside the computer's brain that get adjusted as it learns.

## 🎮 It's Not Just About Getting Things Right

✅ Here's a fun way to look at how a model works: Imagine an AI playing checkers.

- **Results** = The move it makes.
- **Performance** = Whether that move helps it win.

So we're not just interested in what the AI *does*, but whether it's *effective*.

## 🧰 A Beginner's Mini Glossary

✅ Here are some terms I kept coming across and what they mean in beginner-speak:

- ❗**Architecture**: The structure or shape of your model (like how many layers or steps it has).
- ❗**Weights**: The knobs it tweaks while learning.
- ❗**Loss**: A score that tells the model how wrong it is.
- ❗**Metric**: A score that tells *you*, the human, how well the model is doing.
- ❗**Predictions**: What the model guesses.
- ❗**Independent variables**: The data you give the model (without any answers).
- ❗**Labels**: The answers you use to teach the model (e.g., "this is a cat").

✅ You train a model by adjusting the weights so the **loss** gets smaller. You check its progress with a **metric**.

## ❓ Classification vs. Regression — What Are You Predicting?

✅ There are two main types of problems:

- **Classification**: Choosing a category (e.g., Is this a dog, cat, or rabbit?)
- **Regression**: Predicting a number (e.g., What's the temperature tomorrow?)

❗Don't get confused — "regression" doesn't always mean "linear regression" (a common beginner trap!).

## 🧠 Don't Let Your Model Get Too Smart...

✅ If your model becomes *too good* at memorizing the training data, it might fail with new data. This is called **overfitting**.

❗**Overfitting**: When your model memorizes the training examples but can't handle anything new. Like studying only the practice test and bombing the real one.

✅ You can prevent it — but only *after* you're sure it's happening. A big clue? The model's accuracy goes down on new data, even though it looks great on training data.

## ⚙️ Neural Networks and Their Superpowers

✅ Neural networks are special because they can solve all kinds of problems. But they need the right **weights**. To find those, we use a method called:

❗**SGD (Stochastic Gradient Descent)**: A fancy way of saying "try something, see if it worked, and adjust a little bit."

It's how the model learns.

## 🔄 Reusing Smart Models: Why Start From Scratch?

✅ Instead of building a model from nothing, you can use a **pretrained model** — one that's already smart from solving other problems.

- ❗**Transfer Learning**: Using that smart model for a new task.
- ❗**Fine-Tuning**: Tweaking it further with your own data.

This is like hiring someone experienced rather than training a newbie from scratch.

## 🧩 Segmenting an Image? Yep, That's Deep Learning Too

✅ When you want your model to look at each pixel and figure out what it is — like "this pixel is a dog's ear" and "this one's background" — that's called **segmentation**.

## 🔍 What's a Validation Set?

✅ When training a model, you need to set aside some data — called a **validation set** — to test how well your model is doing.

But be careful...

✅ If you keep looking at this validation data while improving the model, you'll start "cheating" without realizing it — making changes that only work on this test set.

❗That's called **overfitting the validation set**, and it's why you need a separate **test set** to check the final model.

## ✅ Bonus Tips I Loved (and Needed)

These tips from the book/course made me feel way less overwhelmed:

1. Google everything. Seriously.
2. Don't get stuck — keep moving even if you don't get it all.
3. Try small, personal projects.
4. Work on stuff you're curious about.
5. Keep it playful!

## 🎉 Wrapping It Up

This first chapter was like a warm welcome into the world of deep learning. Sure, there's some jargon, but the ideas themselves are surprisingly down-to-earth.

It's not about being a genius. It's about **playing, experimenting, learning**, and yes — sometimes getting it wrong.

If you're thinking of diving into deep learning, you don't need to know everything. Just bring your curiosity and start small — the rest will follow.