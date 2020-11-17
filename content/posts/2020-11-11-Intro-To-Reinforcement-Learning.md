---
title: "Intro To Reinforcement Learning"
date: "2020-11-11T10:00:00.0000"
template: "post"
draft: false
slug: "reinforcement-learning-1"
category: "Machine Learning"
tags:
  - "Machine Learning"
  - "Reinforcement Learning"
description: ""
socialImage: "/media/image-2.jpg"
---

--
I am currently using several resources
to go about this journey. I am reading the textbook
http://incompleteideas.net/book/bookdraft2017nov5.pdf, watching lectures from
deep mind, and using the spinningup in Deep RL guide from OpenAI. As I go
through I intend to implement algorithms and explain the core concepts. Often I
find myself stuck by my lack of understanding in the field of probability. So I
will do my best to help direct my reader in the right direction and assume very
limited knowledge of probability. To start with I want to discuss the basics of
the field of reinforcement learning.
--

Reinforcement learning is the process of interacting with your environment and
maximizing some reward. A natural form of reinforcement learning happens all the
time. Whenever a child is playing and learning to understand the world through
interaction natural reinforcement learning is taking place. In computer science
there is a whole field of study to understand how computers can learn from
interaction.  Reinforcement learning differs from other methods of machine
learning in important ways. Instead of training a model on a labeled dataset as
in supervised learning you are working with unlabeled data.  Supervised learning
can not learn from unstructured interaction with the environment. Instead you
are completely dependent on the data you provide. However reinforcement learning
gives us a robust way to learn from interaction without labeling. Another
difference from supervised learning is the need to think about delayed reward.
Not only will you need to think about reward happening immediately but also far
in the future.

So what are some signs that reinforcement learning is the right tool to solve a
problem? If you are in a case where you either need to learn about
your environment or plan the best way to go forward reinforcement learning may
be the right tool.

--
Learning - in these cases the environment is unknown and the agent interacts
with the environment to create a policy.
Planning - if we know the environment then our job becomes to plan what to do.
This does not require interaction with the environment until the plan is made.
--

Before we dive in why study reinforcement learning?  What are some practical
applications of it that are worth viewing. Let’s explore some of the most
impressive accomplishments in RL before jumping in to specifics.

## Examples

# AlphaGo
One of the most impressive uses of RL is board games. For a long time people
held the game of Go as the impossible mountain for AI to climb. The number of
possible states is higher than the number of atoms in the universe. However
using a combination of deep learning and reinforcement learning techniques
Deepmind was able to create a program to beat masters at Go. If you want to
learn more check out the AlphaGo page at
https://deepmind.com/research/case-studies/alphago-the-story-so-far.

## OpenAI 5
OpenAI was able to train a system to play Dota 2 as a team and win against
professionals. Not only was this system able to win it was able to be a good
teammate and support other players on their team regardless of if the player was
human or AI. The complexity of DOTA 2 and the need to collaborate makes this
achievement especially impressive. https://openai.com/projects/five/

SELF DRIVING CAR?

Robotic movement

--
There are multiple complicating factors inherent in thinking about such a
problem including: how far to look in the future, what long term consequences
are of an action, how we actively gain new experiences, how we predict what
comes next, and dealing with the uncertainty of complicated environments.
--

The main structure of reinforcement learning is the agent-environment loop. The
environment is the state of the world that the agent interacts with. The agent
chooses an action based on current and future rewards and that action will then
change the state of the environment. The boundary between agent and environment
can entirely depend on the problem we are trying to solve. For example in the
case of robot movement, parts of the robot may be considered the environment. In
other words we treat the agent as the decision making algorithm instead of as
the robot as a whole.

## Reward

The reward is a feedback signal representing how valuable a state is. The
agent’s job is to maximize cumulative reward. This means the reward of being in
the current state and all future states. This may mean we take actions that
bring us to a state with low immediate reward but high rewards sometime in the
future. A good example of this would be making a financial investment. Doing so
might have negative reward in the immediate moment but high reward later.
We call this cumulative reward return or $ G_t $

$$
G_t = R_{t+1} + R_{t+2} + R_{t+3} + ...
$$

We then find the expected cumulative reward. Which we refer to as the value.

## Discounting
In practice for the value function we will not always use the accumulated reward
but instead a reward accumulated with future time steps discounted. This is
because we prefer reward now rather than later and if we do not discount we
might build a program that prefers rewards so far in the future as to basically
never happen. This is particularly true if we are dealing with an infinite
horizon. A great example of this is if you have a program trying to get out of a
maze we prefer for it to get out sooner rather than eventually. Otherwise we
might see a program that loops for a long period of time rather than getting out
quickly.

## Value

This reward defines the desirability of a single step. We can also define a more
general measure of desirability for future steps. We call this the value. We can
choose to condition this value on just the state or both the state and value. We
refer to the value conditioned on state as v(s).

$$
v(s) = \mathop{\mathbb{E}}[G_t \mid S_t = s]
$$


If we condition on the state and action we call refer to it as q(s, a).


$$
q(s, a) = \mathop{\mathbb{E}}[G_t \mid S_t = s, A_t = a]
$$

Something left out of these definitions is the fact that value functions are
always conditioned on a policy. So we will often use π to denote that we are
conditioning on a policy.

$$
v_π(s) = \mathop{\mathbb{E}}[G_t \mid S_t = s]
$$

$$
q_π(s, a) = \mathop{\mathbb{E}}[G_t \mid S_t = s, A_t = a]
$$

## Policy
A policy is a mapping from state to actions that tells us which action
to take. It can either be deterministic in which case it can be denoted by µ.
Or it can be stochastic and be sampled from a distribution, in which case it
will be referred to as π.

$$
a_t = µ(s_t)
$$
$$
a_t \sim π(\cdot | s_t)
$$

The policy can be viewed as an agent’s brain. It
decides what action we should take. In cases of deep reinforcement learning we
will often use parametrized policies, or a neural net, to define our
action choices.

## Components of an Agent:

## Agent State
An agent carries it’s own state. These states are separate from those of the
environment. The agent’s state is used to choose which actions to perform.

## Environment State
The full information describing the environment. An agent can either have
partial or full access to the state of the environment.  In most real world
problems partial state is what is available. However in some cases, like chess,
the full state of the environment may be known. In many cases the full
state of the environment will carry lots of irrelevant information. For example
a robot does not need to know the exact number of atoms present in the world
around it.

## Model:
A model is a prediction of the next state given an action and the
current state. Models can be used to improve our understanding of future
reward. However models can be difficult to learn and in many cases we choose not
to use them. We can divide RL into model free and model based learning.

The usefulness and practicality of a model very much depends on the problem. In
some domains predicting next states is easier than others. For example in a game
like chess or go predicting the next state is trivial. This is because as soon
as we move a piece on the board the state is obvious. However if you are moving
a robot around the real world it might be much more difficult to understand how
your action will effect the state of the environment.

## Categories of agents.

We can categorize agents based on what components they use to maximize values.
While we will cover this more in depth in future articles I want to lay out the
ideas here.

## Value based:
Has an approximate value function that is used to determine
which actions are better than others. Will not explicitly find the policy but
instead will construct from value function.

## Policy based:
Policy based will map states to actions but will not explicitly find the value.
## Actor critic:
Has both a policy and value function defined. The policy would be the actor and
the value would critique that actor.

## Model free:
Uses a policy or value function but does not have a model

## Model based:
Has a model of the next state but values and policy functions are optional


--

Prediction - give value to future states
Control - find the best future state
is we can find previously unknown solutions.



Domains that it can be used: Piloting a Helicopter Managing an investment
portfolio Making a robot walk Playing video or board games

Waymo?

A central problem in reinforcement learning is the exploration-exploitation
tradeoff. Unless perfect knowledge is available there will always be a choice to
be made in if we should try to discover choices that are valuable or instead
take advantage of the choices we already see as valuable.
