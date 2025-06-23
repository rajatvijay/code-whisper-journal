---
title: What Deep Learning Is Good At (And What It's Not)
excerpt: Diving deeper into practical deep learning — understanding where it excels, where it struggles, and how to approach real-world problems with the right expectations and data strategy.
date: 2025-06-23
readingTime: 12 # minutes
categories:
  - Deep Learning
---

# What Deep Learning Is Good At (And What It's Not)

One thing I'm quickly learning in this deep learning journey is that picking the right problem and understanding how to work with data matters just as much as building fancy models. Chapter 2 of _Practical Deep Learning for Coders_ really brings that point home.

Let me walk you through what I got from it — all in plain language.

---

## Expectations Can Make or Break You

✅ If you expect deep learning to do _everything_ perfectly, you're going to be disappointed. On the flip side, you might give up too early on something totally doable if you assume it's too hard.

The key? Find a **project** and **start experimenting**. Don't worry about finding the perfect dataset or goal. Just start, and improve from there.

✅ Best first step: Find an example online that did something _similar_ to what you're trying to do. Then shape your data to match that example.

---

## What Deep Learning Can Do (and How)

Let's look at a few real-world examples where deep learning shows up.

### Data Augmentation

✅ This is about creating more data from your existing data by tweaking it slightly — like flipping an image, rotating it, or changing its brightness.

It's like showing the model different versions of the same idea so it can learn better.

✅ Works not just for images but also for text and other data types.

---

### Natural Language Processing (NLP)

✅ Deep learning is used for things like:

- Categorizing text
- Translating between languages
- Summarizing long documents
- Captioning images
- Finding mentions of specific ideas

But don't expect it to always generate the _right_ response — it can sound fluent and still be wrong.

---

### Tabular Data

✅ When you have structured data like spreadsheets (think sales figures, customer lists, etc.), deep learning can help — but only to a point.

If you're already using models like random forests or gradient boosting, adding deep learning may not help that much.

---

### Recommendation Systems

✅ These are the engines behind Netflix or Amazon suggestions. They often deal with high-cardinality data — which means data with lots of unique values (like product IDs or user IDs).

Deep learning handles this really well.  
But ✅ these systems don't always know what would actually _help_ the user — just what they're _likely_ to choose.

---

### Other Data Types

✅ Sound can be turned into images called spectrograms and then analyzed like pictures.

✅ Protein sequences (used in biology) look like language — so models from NLP can sometimes be reused there too.

---

## The Drivetrain Approach: Work Backwards

✅ Instead of starting with "build a model," begin with:

1. What's your goal?
2. What actions can you take to reach it?
3. What data do you already have?
4. Can a model help you pick the best actions?

Sometimes, a model that's a little inaccurate can still be very useful. And a super-accurate one might not help at all if it doesn't lead to better decisions.

---

## Variety in Data Matters

✅ If all your training photos are of one type of person, your model won't work well for others. For example, if all your "healthy skin" images are of young white women touching their faces, that's all your model will learn to recognize.

You have to make sure the data reflects the diversity of what you'll see in real life.

---

## Practical Tools and Concepts

### DataLoaders

✅ This is a fastai class that feeds batches of data to your model. To use it, you define:

1. What kind of data (images? text?)
2. How to get the files
3. How to label them
4. How to split into training and validation sets

---

### More on Data Augmentation

✅ One common transform: `RandomResizedCrop`. It randomly selects and crops parts of an image each time — helping your model learn from different views of the same object.

✅ Real-world images vary, so training with variation makes your model more robust.

---

### Confusion Matrix

✅ This tool shows what types of mistakes your model makes. It's especially useful when you have more than two categories.

---

### Clean First? Maybe Not.

✅ You might think you should clean your data before training — but actually, it helps to train a simple model first and use its mistakes to guide your cleaning.

✅ Cleaning and prepping data takes a lot of time — many data scientists say it's 90% of the job.

---

### Exporting a Model

✅ When you save your model, fastai also saves the DataLoader setup, so you don't need to redo your preprocessing steps when using the model later.

---

### Inference

✅ This just means: using your model to make predictions, not to train it.

---

## From Theory to Practice

✅ Start simple. If you can run things on a regular CPU, do that. No need for GPUs unless you really need them.

✅ Before launching something live, simulate what the results would have looked like using last year's data. That's a safer way to test.

✅ Ask yourself: What if the model works really well? Who's affected? Could it cause harm? Think it through before deploying.

---

## Real-World Problems: What Makes ML Tricky

### Out-of-domain

✅ It's hard for models to deal with examples they've never seen anything like before.

### Domain Shift

✅ Over time, the world changes. Your model may become outdated. Updating it is hard but necessary.

---

## How to Roll Out a Model Safely

✅ A safe process looks like this:

1. Manual Testing: Run the model but don't act on it — just observe.
2. Limited Launch: Try it in one city or department. Monitor closely.
3. Gradual Expansion: Use good reporting to keep tabs and look for problems.

---

## Blogging About ML (Yes, You Should)

✅ Blogging isn't just for showing off. It helps you:

- Learn better by organizing your thoughts
- Attract job offers
- Get speaking invites
- Meet like-minded people
- Save time answering the same questions
- Help others just one step behind you

✅ Your unique way of explaining things might be exactly what someone else needs.

---

If Chapter 1 was about what deep learning _is_, Chapter 2 is about when and how to use it wisely. The technology is powerful — but it's not magic. It takes thoughtful setup, honest data, and real-world caution.
