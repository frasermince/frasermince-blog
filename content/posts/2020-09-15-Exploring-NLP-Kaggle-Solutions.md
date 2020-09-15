---
title: "Exploring Solutions In Jigsaw Kaggle Contest"
date: "2020-09-15T10:00:00.0000"
template: "post"
draft: true
slug: "exploring-kaggle"
category: "Machine Learning"
tags:
  - "Machine Learning"
  - "NLP"
  - "Kaggle"
description: ""
socialImage: "/media/image-2.jpg"
---

A year ago I attempted with my limited knowledge to compete in the Jigsaw Toxicity Kaggle contest. The goal of this contest is, given a sentence, classify if this sentence contains toxicity. I did not do particularly well in the competition, however I was very curious to how I could have done better. While the 2020 jigsaw challenge is slightly different than the one I participated in I want to look at the solution provided by its winner and explore in depth what they did in order to make a state of the art language classifier.

The winners have outlined their solution in a [post](https://www.kaggle.com/c/jigsaw-multilingual-toxic-comment-classification/discussion/160862) on kaggle but they reference a lot of the core concepts without explaining what they mean. While this is very reasonable for their purposes I personally had not been exposed to a lot of these ideas and thus have spent time learning how all the different pieces work. So this article is a byproduct of my seeking understanding into this solution. This post will be a deep dive into that aforementioned discussion by the winner and a reimplementation https://www.kaggle.com/mint101/jmtc-20-lb-9508-mono-lingual-models.

## Why Write About This Contest?
Over the last couple of years I have learned the concepts behind the state of
the art in Natural Language Processing. However I have been very aware that
knowing how it works and building a industry ready model are two different
things. The Jigsaw Toxicity challenge is one of the biggest NLP competitions on
Kaggle. I have assumed by discussing the solution provided by the first place winner
I can help others go from understanding the concepts to building something
robust.

## Introduction to Transformers
At a high level the winner used XLM-Roberta as their model which is in the
tranformer family of models. Transformers are responsible for a lot of the advances in NLP in the last few
years. And this is due to an idea called self attention that has become the
standard.

Previously to this the state of the art solutions used something
called a RNN. This would process text a piece at a time and learn connections
between different pieces of the text. An RNN is a very powerful tool but it
leads to very deep networks since each piece of the text adds layers to that
network. The new idea researchers had was to avoid that depth and instead
use something called attention to find connections between lots of words in
parallel. So instead of processing a word at a time and building connections we would look at a larger
piece of text at once and discern which words were significant for understanding
other words. This led to shallower networks that required less training.

The origin of using this approach is due to a paper called
[Attention is All You Need](https://arxiv.org/abs/1706.03762). Over the last couple years we have seen this
approach really take off and has led to huge increases in performance on common
NLP problems and the existence of pretrained models allowing for better results
while using less compute. Models that use this self-attention mechanism are
called transformers. If you are interested in learning more I would check out
[The Illustrated Transformer](http://jalammar.github.io/illustrated-transformer/), [The Illustarted Bert](http://jalammar.github.io/illustrated-bert/), and the original Paper [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

## K-fold CV

## Ensembling

The core of the approach mentioned in the article is based on the idea that you can get better predictions if you combine several models to get a more robust one. This is called ensembling. There are two factors you may consider when thinking about ensembling: bias, and variance. Bias and variance represent a spectrum from underfitting to overfitting. You can think about this as a spectrum of flexibility.

<figure>
  <img src="/media/bias-variance.png" alt="Bias Variance Tradeoff">
  <figcaption>Tradeoff between variance and bias. Source: https://towardsdatascience.com/ensemble-methods-bagging-boosting-and-stacking-c9214a10a205</figcaption>
</figure>

An algorithm with high bias has specific ways it works leading to less flexibility and potentially underfitting. An algorithm with high variance can be extremely flexible but thus may be very reactive to differences in training data leading to high variance.

With transformer models in particular we suffer from a high degree of variance. This means that BERT like models and, specifically in our case, XLM-Roberta can work differently depending on the seed with which weights are initialized and the order data is processed. So we will attempt to use an ensembling approach to reduce this high amount of variance. There are multiple kind of ensembling approaches. The most relevant one to reduce variance however is bagging.

Bagging is the process of sampling from data at random with replacement and using these samples to train multiple models in parallel. Because we are concerned that the order of training data could lead to subpar results we account for this by training multiple models and combining their results. If you want to learn more about various methods of ensembling I would highly suggest [this article](https://towardsdatascience.com/ensemble-methods-bagging-boosting-and-stacking-c9214a10a205).

## Iterative Blending

## Pseudo Labels

Pseudo labels is the process of using model generated predictions of test data as training data. So basically we take our test data, run it through our model and use these values as the target in our next run to train the model. This may seem like some strange form of circular logic that just increases a models weaknesses but their are tricks we can apply to make such a solution work.

At the simplest level we provide a weight to the predictions generated from pseudo labels. We start with a very low weight, representating a low degree of confidence that the pseudo labeled predictions are right. We then increase the weight over time as we get more confident in our model. The benefit of pseudo labeling is it teaches our model about patterns outside of just our training data. Thus the model can learn something more general instead of picking up on incidental patterns in our training data. For Kaggle they used Temporal Self-Ensembling in order to accomplish this.


## Temporal Self-Ensembling
Temporal Self-Ensembling is a way to ensure that the Pseudo labeled predictions
become more accurate over time. Without some mitigation strategy pseudo labeling
could lead to increasing the weaknesses and blind spots of a model. Temporal Self-Ensembling
helps prevent this. We do this by aggregating the results of the model over
multiple epochs and using these past predictions to adjust newer predictions on
Pseudo labels.

Specifically we will keep track of two piece of information
across epochs. A weighted average of predictions made from each epoch, and the targets we are interested
in. To create the averages we blend together the labeled
predictions and the unlabeled predictions based on a parameter called alpha.
This parameter works to determine how much of the current predictions we use versus our previous ones. We then store the targets we want to use in the future by
taking the prediction average we just calculated and diving by 1 - alpha ^ epoch_number. For example if alpha is 0.6 in the first epoch we would divide our value by 0.4. In the second it would be 0.64 and by the third it would be
0.784. This means that the more we train the more we rely upon our unlabeled
targets.

We then use our model to train both our labeled and unlabeled data separately.
We calculate our loss by doing cross-entropy loss on the labeled part and
mean squared error multiplied by some scalar on the unsupervised piece. This
scalar includes a rampup value that is predetermined and another value that is
not really made clear in the paper.

The [original paper](https://openreview.net/pdf?id=BJ6oOfqge) includes pseudo code but I found it fairly hard to read. So I took what I could gather from that Pseudo Code and [an implementation](https://github.com/tensorfreitas/Temporal-Ensembling-for-Semi-Supervised-Learning) and tried to write a more developer friendly piece of pseudocode.
a more verbose version here for clarity.

```python
weighed_predictions = 0[N x C]
accumulated_targets = 0[N x C]
for epoch_number in [1, num_epochs]:
  for each batch:
    labeled_data, labeled_targets = get_labeled(batch)
    unlabeled_data = get_unlabeled(batch)

    labeled_predictions = model(labeled_data)
    unlabeled_predictions = model(unlabeled_data)
    outputs = [labeled_predictions, unlabeled_predictions]

    loss =
      cross_entropy_loss(
          labeled_predictions,
          labeled_targets
      )
      + mean_squared_error(
        unlabeled_predictions,
        accumulated_targets[current_indexes]
      )

    update_gradients(loss)

    weight_predictions[current_indexes] =
      alpha * weighted_predictions[current_indexes]
        + (1 - alpha) * outputs
    accumulated_targets[current_indexes] =
      weighted_predictions[current_indexes]
        * (1 / (1 - alpha ^ epoch_number))
```

## Foreign language monolingual Transformer models
One of the unique challenges for the 2020 Jigsaw Competition was the inclusion
of foreign language test entries without having foreign language training data.
This meant that outside data and creative solutions would be needed to properly
classify these examples. The winners used a solution from the [MultiFiT Paper](https://arxiv.org/pdf/1909.04761.pdf) to increase the accuracy.

## References
https://openreview.net/pdf?id=BJ6oOfqge
https://arxiv.org/pdf/1909.04761.pdf
https://github.com/tensorfreitas/Temporal-Ensembling-for-Semi-Supervised-Learning
https://arxiv.org/pdf/1804.09170.pdf

https://www.kaggle.com/c/jigsaw-multilingual-toxic-comment-classification/discussion/160862
