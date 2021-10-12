---
layout: page
title: SimpleRNN Example
permalink: /211012_SimpleRNNExample/
use_math: true
---

`timestep` 변수의 값을 1~100까지 변화시켜가며 실행시켜 보자.

```
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import tensorflow.keras as keras
import tensorflow.keras.layers as layers

def gen_input_seq(timesteps):
    u1 = np.zeros(100)
    u2 = np.ones(100)
    u = np.r_[u1,u2]
    input_seq = []
    for i in range(len(u)-timesteps):
        tmp = u[i:i+timesteps]
        input_seq.append(tmp)
    input_seq = np.array(input_seq)
    return input_seq.reshape(input_seq.shape[0],input_seq.shape[1],1)

def define_model(batch_size,timesteps):
    rnn = layers.SimpleRNN(2,activation='linear',use_bias=False,stateful=True)
    input = keras.Input(batch_shape=(batch_size,timesteps,1))
    model = keras.Model(inputs=input,outputs=rnn(input))
    weights = [np.array([[1,1]]),np.array([[0,1],[-0.6,0.2]])]
    model.set_weights(weights)
    return model

def plot_result(x):
    fig = plt.figure(figsize=(10,4))
    for i in range(x.shape[1]):
        plt.plot(x[:,i])

timesteps = 30
input_seq = gen_input_seq(timesteps)
batch_size = input_seq.shape[0]
model = define_model(batch_size,timesteps)
x = model(input_seq)
plot_result(x)
```
