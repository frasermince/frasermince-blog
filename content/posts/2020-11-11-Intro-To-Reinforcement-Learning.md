---
title: "Intro To Reinforcement Learning"
date: "2020-11-11T10:00:00.0000"
template: "post"
draft: false
slug: "reinforcement-learning-1"
category: "Growth"
tags:
  - "Machine Learning"
  - "Reinforcement Learning"
description: ""
socialImage: "/media/image-2.jpg"
---

I am currently using several resources
to go about this journey. I am reading the textbook
http://incompleteideas.net/book/bookdraft2017nov5.pdf, watching lectures from
deep mind, and using the spinningup in Deep RL guide from OpenAI. As I go
through I intend to implement algorithms and explain the core concepts. Often I
find myself stuck by my lack of understanding in the field of probability. So I
will do my best to help direct my reader in the right direction and assume very
limited knowledge of probability. To start with I want to discuss the basics of
the field of reinforcement learning.

Reinforcement learning is the process of interacting with your environment and
maximizing some reward. A natural form of reinforcement learning happens all the
time. Whenever a child is playing and learning to understand the world through
interaction an analogue of it is taking place. In computer science there is a
whole field of study to understand how this can take place with computers. 
While reinforcement learning belongs in the category of machine learning it differs from other methods
in important ways. It differs from supervised learning where you are training a model based on a
labeled dataset. Supervised learning can not learn from unstructured interaction with the
environment. Instead you are completely dependent on the data you provide. However
reinforcement learning gives us a robust way to learn from interaction without
labeling. Another difference from supervised learning is the need to think about
delayed reward. Not only will you need to think about reward happening
immediately but also far in the future.

There are multiple complicating factors inherent in thinking about such a
problem including: how far to look in the future, what long term consequences
are of an action, how we actively gain new experiences, how we predict what
comes next, and dealing with the uncertainty of complicated environments.

The main structure of reinforcement learning is the agent-environment loop. The
environment is the state of the world that the agent interacts with. The agent
chooses an action based on current and future rewards and that action will then
change the state of the environment. The boundary between agent and environment
can entirely depend on the problem we are trying to solve. For example in the
case of robot movement, parts of the robot may be considered the environment. In
other words we treat the agent as the decision making algorithm instead of as
the robot as a whole.

The reward is a feedback signal representing how valuable a state is. The
agent’s job is to maximize cumulative reward. This means the reward of being in
the current state and all future states. This may mean we take actions that
bring us to a state with low immediate reward but high rewards sometime in the
future. A good example of this would be making a financial investment. Doing so
might have negative reward in the immediate moment but high reward in the
future.

## Policy
A policy is a mapping from state to actions that tells us which action
to take. It can either be deterministic in which case it can be denoted by mu.
Or it can be stochastic and be sampled from a distribution, in which case it
will be referred to as pi. The policy can be viewed as an agent’s brain. It
decides what action we should take. In cases of deep reinforcement learning we
will often use parametrized policies, or a neural net, to define our
action choices.


# Diagram for return or cumulative reward Gt

We then find the expected cumulative reward. Which we refer to as the value.

# Diagram of value or expected cumulative	reward

So both the reward and the value define the desirability of a
transition. With the reward defining the desirability of a single step and the
value being a more general measure of desirability for that state going to the
indefinite future.

We can choose to condition on just the current state or on the state and action.
If we choose to condition on both we call this Q.

# Q function definition

## Components of an Agent:

## Agent State
An agent carries it’s own state. These states are separate from those of the
environment. The agent’s state is used to choose actions to perform 

## Environment State
The full information describing the environment. An agent can either have
partial or full access to the state of the environment.  In most real world
problems partial state is what is available. However in some cases, like chess
for example, the full state of the environment may be know. Often time the full
state of the environment will carry lots of irrelevant information. For example
a robot does not need to know the exact number of atoms present in the world
around it.


## Value functions
In practice for the value function we will not simply use the accumulated reward
but instead a reward accumulated with future timesteps discounted. This
is because we prefer reward now rather than later and if did not discount we
might build a program that prefers rewards so far in the future as to basically
never happen. A great example of this is if you have a program trying to get out
of a maze we prefer for it to get out sooner rather than eventually. Otherwise
we might see a program that loops for a long period of time rather than getting
out quickly.


## Approximation: ?REMOVE
Often times the state space will be too big to calculate the
actual value function and instead we will attempt to approximate using something
like a neural net. I will not go into detail here but will discuss this further
in a later article. 

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

## Different types of agents

## Value based: 
Has an approximate value function that is used to determine
which actions are better than others. Will not explicitly find the policy but
instead will construct from value function.

## Policy based: 
Policy based will map states to actions but will not explicitly find the value.
## Actor critic: 
Has both a policy and value function defined. The policy would be a actor and
the value would critique that actor. 



## Model free: 
Uses a policy or value function but does not have a model

## Model based: 
Has a model of the next state but values and policy functions are optional

Specifically we can say there are two hard things in RL: Learning - in these
cases the environment is unknown and the agent interacts with the environment to
create a policy.  Planning - if we know the environment then our job becomes to
plan what to do. This does not require interaction with the environment until
the plan is made

Prediction - give value to future states Control - find the best future state

So what can we uniquely accomplish with reinforcement learning. One major thing
is we can find previously unknown solutions. If you are playing a game like
Chess or Go we could use reinforcement learning to learn better ways of playing
which a human has never thought of. We can also build programs that continue to
learn even while being operated to adapt to new circumstances. A great example
of this is robots interacting with terrain they have never seen before and
learning to handle it.  So before we dive in why study reinforcement learning?
What are some practical applications of it that are worth viewing. Let’s explore
some of the most impressive accomplishments in RL before jumping in to
specifics. 

Domains that it can be used: Piloting a Helicopter Managing an investment
portfolio Making a robot walk Playing video or board games

Specific cool applications: AlphaGo

Dota

Waymo?

 

A central problem in reinforcement learning is the exploration-exploitation
tradeoff. Unless perfect knowledge is available there will always be a choice to
be made in if we should try to discover choices that are valuable or instead
take advantage of the choices we already see as valuable.


Elements of reinforcement learning:

Reinforcement learning consists of a few core concepts: Environment - The
environment is everything you can Reinforcement learning differs from Supervised
learning in some very core ways. In supervised learning you are training a model
based on a training set that you have already defined. Reinforcement	learning
on the other hand requires defining or predicting rewards signals in order to
improve your actions. So in reinforcement learning you do not know the correct
answer but you can define rewards that help you move in the correct direction.

Terms in reinforcement learning:

State Action Value Policy


Categories of Algorithms Actor Critic Model Model Free
