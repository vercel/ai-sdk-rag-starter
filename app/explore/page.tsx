"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, ChevronRight,ChevronLeft } from "lucide-react"

import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';

const topics = [
  {
    "id": 1,
    "title": "Markov Decision Processes",
    "content": "MDPs are used for modeling decision-making problems where outcomes are partly random and partly under the control of a decision maker.",
    "x": -7.955694574066359,
    "y": -3.584917665487916,
    "z": -1.4615804201242613
  },
  {
    "id": 1.1,
    "title": "Markov Decision Processes",
    "content": "In an MDP, the agent moves through a set of states by taking actions, with probabilistic transitions between states.",
    "x": -7.2912917609496155,
    "y": -4.101477014784443,
    "z": -2.5771981093646965
  },
  {
    "id": 1.2,
    "title": "Markov Decision Processes",
    "content": "Key components of an MDP include states, actions, rewards, and transition probabilities, which define the environment's dynamics.",
    "x": -7.983199103794465,
    "y": -3.768666402569617,
    "z": -1.7383592918306248
  },
  {
    "id": 1.3,
    "title": "Markov Decision Processes",
    "content": "The agent aims to maximize its expected cumulative reward by choosing an optimal policy, a strategy that specifies which action to take in each state.",
    "x": -7.170882229140179,
    "y": -3.7781850310715757,
    "z": -2.270354777939691
  },
  {
    "id": 2,
    "title": "Q-Learning",
    "content": "Q-Learning is a model-free reinforcement learning algorithm that finds the best action to take in a given state.",
    "x": -5.4243368455989875,
    "y": -3.760960318543656,
    "z": 4.436693917962585
  },
  {
    "id": 2.1,
    "title": "Q-Learning",
    "content": "The Q-value represents the quality of a state-action pair, guiding the agent towards the optimal action in any given situation.",
    "x": -4.672323024148714,
    "y": -3.956220605282515,
    "z": 4.644676456954065
  },
  {
    "id": 2.2,
    "title": "Q-Learning",
    "content": "Q-Learning uses the Bellman equation to iteratively update Q-values based on the agent's experience in the environment.",
    "x": -4.628683053070809,
    "y": -4.210874063349931,
    "z": 4.595606191423393
  },
  {
    "id": 2.3,
    "title": "Q-Learning",
    "content": "In Q-Learning, an agent updates its Q-value estimates using the immediate reward and the estimated future rewards from subsequent states.",
    "x": -4.565674659633234,
    "y": -4.1524033232547435,
    "z": 4.398757649885736
  },
  {
    "id": 3,
    "title": "K-Bandit Problem",
    "content": "The K-Bandit problem is a classic reinforcement learning scenario where the agent must balance exploration and exploitation.",
    "x": 3.1183362858001966,
    "y": -1.643131324813875,
    "z": 7.042478807274349
  },
  {
    "id": 3.1,
    "title": "K-Bandit Problem",
    "content": "The agent selects one of several arms of a K-armed bandit and receives a reward, with the goal of maximizing the cumulative reward over time.",
    "x": 3.9648265664803275,
    "y": -1.179347386218222,
    "z": 7.651503518162914
  },
  {
    "id": 3.2,
    "title": "K-Bandit Problem",
    "content": "Solving the K-Bandit problem involves identifying the arm with the highest expected reward while still exploring less familiar arms.",
    "x": 4.11000685816724,
    "y": -1.6153707307590301,
    "z": 6.651166462187087
  },
  {
    "id": 4,
    "title": "Monte Carlo Methods",
    "content": "Monte Carlo methods rely on repeated random sampling to estimate the properties of a system.",
    "x": 0.49177182294588373,
    "y": -1.1771148077784224,
    "z": 3.643618119995085
  },
  {
    "id": 4.1,
    "title": "Monte Carlo Methods",
    "content": "In Monte Carlo methods, simulations are run numerous times to compute estimates of unknown quantities, such as expected rewards.",
    "x": 0.4122547207345105,
    "y": -1.550801191649252,
    "z": 2.988124498489401
  },
  {
    "id": 4.2,
    "title": "Monte Carlo Methods",
    "content": "These methods are often used in problems where exact solutions are difficult to obtain, such as reinforcement learning.",
    "x": -0.37211303814949337,
    "y": -1.799176098443255,
    "z": 3.1283199863656033
  },
  {
    "id": 4.3,
    "title": "Monte Carlo Methods",
    "content": "By averaging the results of many trials, Monte Carlo methods provide an approximation of the true distribution of outcomes.",
    "x": 0.3974671262492047,
    "y": -1.4741022942943809,
    "z": 2.726016152549162
  },
  {
    "id": 5,
    "title": "Temporal Difference Learning",
    "content": "Temporal Difference (TD) learning combines ideas from Monte Carlo methods and dynamic programming.",
    "x": 9.816135111758657,
    "y": 9.963302071983694,
    "z": -6.434855852717607
  },
  {
    "id": 5.1,
    "title": "Temporal Difference Learning",
    "content": "TD learning allows the agent to update its estimates based on current predictions, improving efficiency compared to other methods.",
    "x": 9.953434923731765,
    "y": 9.834026921035715,
    "z": -6.385492551016163
  },
  {
    "id": 5.2,
    "title": "Temporal Difference Learning",
    "content": "The TD error measures the difference between predicted rewards and actual outcomes, driving the learning process.",
    "x": 10.098938105307864,
    "y": 9.758090069892349,
    "z": -7.621311911013532
  },
  {
    "id": 6,
    "title": "Neuroplasticity",
    "content": "Neuroplasticity refers to the brain's ability to adapt and reorganize itself by forming new neural connections.",
    "x": -10.305680780790611,
    "y": 8.521602310018011,
    "z": -9.617752745131895
  },
  {
    "id": 6.1,
    "title": "Neuroplasticity",
    "content": "This ability is critical for learning, memory, and recovery from brain injuries.",
    "x": -9.942357680578153,
    "y": 8.167893847793719,
    "z": -9.30930152035974
  },
  {
    "id": 6.2,
    "title": "Neuroplasticity",
    "content": "Neuroplasticity allows the brain to adjust to new experiences or changes in the environment, reinforcing synaptic pathways.",
    "x": -10.113942622313484,
    "y": 8.497545054255017,
    "z": -10.360281546383032
  },
  {
    "id": 6.3,
    "title": "Neuroplasticity",
    "content": "Increased neuroplasticity can lead to enhanced learning and adaptation, while its reduction may result in cognitive decline.",
    "x": -9.678952780033022,
    "y": 8.288459735347438,
    "z": -9.595728127428087
  },
  {
    "id": 7,
    "title": "Artificial Neural Networks",
    "content": "Artificial Neural Networks (ANNs) are computing systems inspired by biological neural networks in the human brain.",
    "x": 2.4333453149950883,
    "y": 6.4892540077015175,
    "z": -6.331211059746948
  },
  {
    "id": 7.1,
    "title": "Artificial Neural Networks",
    "content": "An ANN consists of layers of nodes or neurons, where each neuron processes inputs and passes the result to the next layer.",
    "x": 2.3840612465328674,
    "y": 5.96175451097813,
    "z": -6.423678584200051
  },
  {
    "id": 7.2,
    "title": "Artificial Neural Networks",
    "content": "ANNs learn to perform tasks by adjusting the weights of connections between neurons based on error minimization.",
    "x": 2.4891909181881346,
    "y": 6.0483531292681265,
    "z": -6.9212252837114985
  },
  {
    "id": 7.3,
    "title": "Artificial Neural Networks",
    "content": "These networks have achieved breakthroughs in areas such as image recognition, natural language processing, and robotics.",
    "x": 2.3904133035206163,
    "y": 6.153289338868811,
    "z": -7.235975377712459
  },
  {
    "id": 8,
    "title": "Gradient Descent",
    "content": "Gradient Descent is an optimization algorithm used to minimize a function by iteratively moving in the direction of steepest descent.",
    "x": -2.3440610555607857,
    "y": -4.12024505603094,
    "z": 6.192091984050057
  },
  {
    "id": 8.1,
    "title": "Gradient Descent",
    "content": "The goal of Gradient Descent is to find the optimal set of model parameters by minimizing the cost function.",
    "x": -2.040328816469045,
    "y": -3.405107289251452,
    "z": 6.774936338690343
  },
  {
    "id": 8.2,
    "title": "Gradient Descent",
    "content": "Variants of Gradient Descent, such as Stochastic Gradient Descent, introduce randomness to improve convergence speed.",
    "x": -1.8208606929361624,
    "y": -3.8888361668520566,
    "z": 7.07958895327225
  },
  {
    "id": 9,
    "title": "Value Iteration",
    "content": "Value Iteration is a method used in dynamic programming to compute the optimal policy by iterating over state values.",
    "x": 0.8164018110827261,
    "y": 0.03959149889185448,
    "z": 0.9823818974981247
  },
  {
    "id": 9.1,
    "title": "Value Iteration",
    "content": "The algorithm calculates the expected utility of each state and action combination, updating the value function iteratively.",
    "x": 0.8921100034513748,
    "y": 0.9708112933202933,
    "z": -0.2805645081997576
  },
  {
    "id": 9.2,
    "title": "Value Iteration",
    "content": "Once the value function converges, the agent can extract the optimal policy by selecting actions that maximize the state values.",
    "x": 0.7298701791262069,
    "y": -0.05431813984945766,
    "z": 0.16780237150543226
  },
  {
    "id": 10,
    "title": "Policy Gradient Methods",
    "content": "Policy Gradient methods are used to directly optimize the policy in reinforcement learning.",
    "x": -2.774642442920781,
    "y": -9.244557891529606,
    "z": -9.902316287632503
  },
  {
    "id": 10.1,
    "title": "Policy Gradient Methods",
    "content": "These methods adjust the parameters of the policy in the direction that increases the expected reward.",
    "x": -2.676237390536704,
    "y": -9.087729364952052,
    "z": -9.596316175930903
  },
  {
    "id": 10.2,
    "title": "Policy Gradient Methods",
    "content": "Unlike value-based methods, policy gradient methods explicitly represent the policy, allowing for more efficient learning in continuous action spaces.",
    "x": -2.4314967503808176,
    "y": -9.359965759401804,
    "z": -9.451474140222814
  },
  {
    "id": 11,
    "title": "Bayesian Networks",
    "content": "Bayesian networks represent probabilistic relationships among variables in a directed acyclic graph.",
    "x": -6.190307044028916,
    "y": 8.283273389952875,
    "z": 9.670069993879176
  },
  {
    "id": 11.1,
    "title": "Bayesian Networks",
    "content": "In Bayesian networks, the nodes represent random variables, and the edges represent conditional dependencies.",
    "x": -5.879899998353065,
    "y": 8.555856782785137,
    "z": 9.36475675519653
  },
  {
    "id": 11.2,
    "title": "Bayesian Networks",
    "content": "These networks are used to model uncertain systems, combining expert knowledge with observed data.",
    "x": -5.7549943867721876,
    "y": 8.262763792937655,
    "z": 9.988654528007467
  },
  {
    "id": 11.3,
    "title": "Bayesian Networks",
    "content": "Bayesian networks can be used for diagnostic, predictive, and decision-support systems by calculating posterior probabilities.",
    "x": -5.919746153650525,
    "y": 8.283973352211925,
    "z": 9.866671769833813
  },
  {
    "id": 12,
    "title": "Computer Vision",
    "content": "Computer Vision is a field of AI that enables machines to interpret and understand visual data.",
    "x": 0.703169706517658,
    "y": -6.778239839391249,
    "z": 2.6425913763669335
  },
  {
    "id": 12.1,
    "title": "Computer Vision",
    "content": "In Computer Vision, algorithms are designed to process images and videos to extract useful information.",
    "x": -0.006884009844698835,
    "y": -7.088593083361342,
    "z": 3.1901688906157077
  },
  {
    "id": 12.2,
    "title": "Computer Vision",
    "content": "Tasks in Computer Vision include object detection, facial recognition, and image classification.",
    "x": 0.7273643093044151,
    "y": -6.776913181485466,
    "z": 2.6512276755617354
  },
  {
    "id": 12.3,
    "title": "Computer Vision",
    "content": "Advancements in deep learning have significantly improved performance in Computer Vision tasks, such as image segmentation.",
    "x": 0.717245689215047,
    "y": -6.769229485119962,
    "z": 2.5714802913606714
  },
  {
    "id": 13,
    "title": "Cognitive Science",
    "content": "Cognitive Science is the interdisciplinary study of the mind and its processes, integrating psychology, AI, and neuroscience.",
    "x": -6.94794406609554,
    "y": 1.9844212097220446,
    "z": 6.762901538815237
  },
  {
    "id": 13.1,
    "title": "Cognitive Science",
    "content": "This field explores how information is represented, processed, and transformed in the brain.",
    "x": -6.807897595272384,
    "y": 2.033814983448551,
    "z": 6.8211233183992475
  },
  {
    "id": 13.2,
    "title": "Cognitive Science",
    "content": "Cognitive scientists use AI models to simulate cognitive processes such as learning, memory, and perception.",
    "x": -6.791024128272466,
    "y": 2.0443026772052804,
    "z": 7.47787827866444
  },
  {
    "id": 13.3,
    "title": "Cognitive Science",
    "content": "By combining insights from AI and neuroscience, Cognitive Science aims to build models of intelligent behavior.",
    "x": -6.822531073643238,
    "y": 2.057786330544813,
    "z": 6.721156283371458
  },
  {
    "id": 14,
    "title": "Deep Reinforcement Learning",
    "content": "Deep Reinforcement Learning combines reinforcement learning with deep neural networks to solve complex problems.",
    "x": 2.851324730021241,
    "y": -3.6531272147113065,
    "z": 6.422135072443365
  },
  {
    "id": 14.1,
    "title": "Deep Reinforcement Learning",
    "content": "This approach has been applied in tasks such as game playing, robotics, and autonomous driving.",
    "x": 2.79938376572255,
    "y": -3.932331861026228,
    "z": 6.462784744310375
  },
  {
    "id": 14.2,
    "title": "Deep Reinforcement Learning",
    "content": "Deep RL algorithms use deep networks to approximate value functions or policies, allowing for learning in high-dimensional state spaces.",
    "x": 3.790402152717011,
    "y": -3.920649496008273,
    "z": 5.768295535430581
  },
  {
    "id": 14.3,
    "title": "Deep Reinforcement Learning",
    "content": "Techniques like experience replay and target networks stabilize learning in Deep Reinforcement Learning.",
    "x": 2.2733918507982054,
    "y": -3.2214377626705275,
    "z": 5.815520091495773
  },
  {
    "id": 15,
    "title": "Neurogenesis",
    "content": "Neurogenesis is the process of forming new neurons in the brain, a critical aspect of brain development and repair.",
    "x": 5.375632129644393,
    "y": 6.453254355797558,
    "z": 7.890647124254844
  },
  {
    "id": 15.1,
    "title": "Neurogenesis",
    "content": "This process occurs throughout life, particularly in the hippocampus, an area associated with memory.",
    "x": 5.191936842077172,
    "y": 6.4638996805379145,
    "z": 8.20129414657537
  },
  {
    "id": 15.2,
    "title": "Neurogenesis",
    "content": "Neurogenesis plays a role in cognitive functions like learning and adaptation, as well as in recovery from brain injuries.",
    "x": 4.963696683086179,
    "y": 6.7323567925070025,
    "z": 7.5409967263848525
  },
  {
    "id": 16,
    "title": "Computational Neuroscience",
    "content": "Computational Neuroscience uses mathematical models to understand brain function and simulate neural behavior.",
    "x": 8.207047556095056,
    "y": 9.731161929849291,
    "z": -0.43569058929659266
  },
  {
    "id": 16.1,
    "title": "Computational Neuroscience",
    "content": "This field combines concepts from neuroscience, physics, and computer science to model brain activity.",
    "x": 7.903687875551223,
    "y": 8.922204620499864,
    "z": 0.4816208664548038
  },
  {
    "id": 16.2,
    "title": "Computational Neuroscience",
    "content": "By building computational models, researchers aim to replicate and predict neural mechanisms.",
    "x": 8.475492642171567,
    "y": 9.689734767996333,
    "z": 0.25472485442181136
  },
  {
    "id": 16.3,
    "title": "Computational Neuroscience",
    "content": "It helps in understanding how complex brain functions, such as perception, memory, and motor control, are computed.",
    "x": 8.109546080773029,
    "y": 9.762090263851835,
    "z": -0.8065047629219924
  },
  {
    "id": 17,
    "title": "Long Short-Term Memory (LSTM)",
    "content": "LSTMs are a type of recurrent neural network (RNN) designed to model long-term dependencies in sequence data.",
    "x": -0.037467124142818053,
    "y": 7.963975387044287,
    "z": -3.315074836268609
  },
  {
    "id": 17.1,
    "title": "Long Short-Term Memory (LSTM)",
    "content": "They use memory cells to store and update information over time, making them effective for time-series prediction.",
    "x": -0.18642335051931708,
    "y": 7.357000031672303,
    "z": -3.4768861259367556
  },
  {
    "id": 17.2,
    "title": "Long Short-Term Memory (LSTM)",
    "content": "LSTMs are used in natural language processing, speech recognition, and time-series forecasting.",
    "x": -0.3266184364504983,
    "y": 6.948661895135422,
    "z": -3.2272873572074814
  },
  {
    "id": 17.3,
    "title": "Long Short-Term Memory (LSTM)",
    "content": "The LSTM architecture includes gates that control the flow of information, allowing it to capture both short- and long-term patterns.",
    "x": -0.47494110204043694,
    "y": 7.383366415395508,
    "z": -3.4150744227104877
  },
  {
    "id": 18,
    "title": "Generative Adversarial Networks (GANs)",
    "content": "GANs consist of two neural networks, a generator and a discriminator, that compete in a zero-sum game to produce realistic data.",
    "x": -9.207996603948715,
    "y": 7.955396571298888,
    "z": 4.249627298294252
  },
  {
    "id": 18.1,
    "title": "Generative Adversarial Networks (GANs)",
    "content": "The generator creates new data samples, while the discriminator tries to distinguish between real and generated data.",
    "x": -9.51821487706544,
    "y": 7.315603763016921,
    "z": 4.113643200969282
  },
  {
    "id": 18.2,
    "title": "Generative Adversarial Networks (GANs)",
    "content": "GANs have been used in image generation, style transfer, and data augmentation tasks.",
    "x": -9.843159218478624,
    "y": 7.238945709823382,
    "z": 4.155284031893959
  },
  {
    "id": 18.3,
    "title": "Generative Adversarial Networks (GANs)",
    "content": "One major challenge in training GANs is achieving a balance between the generator and discriminator to avoid mode collapse.",
    "x": -9.947172701933926,
    "y": 7.584888537296416,
    "z": 4.251699784184744
  },
  {
    "id": 19,
    "title": "Unsupervised Learning",
    "content": "Unsupervised Learning is a machine learning paradigm where the model learns patterns from unlabeled data.",
    "x": -8.491192187523811,
    "y": 0.296766614147563,
    "z": 7.993647201385727
  },
  {
    "id": 19.1,
    "title": "Unsupervised Learning",
    "content": "Common algorithms include clustering techniques such as K-means and dimensionality reduction techniques like PCA.",
    "x": -7.962294227640482,
    "y": 0.7644535877910268,
    "z": 9.277261559169068
  },
  {
    "id": 19.2,
    "title": "Unsupervised Learning",
    "content": "In unsupervised learning, the model discovers hidden structures in the data, such as natural groupings or relationships between features.",
    "x": -8.026936789175567,
    "y": 0.9423564658475287,
    "z": 8.05031685951009
  },
  {
    "id": 19.3,
    "title": "Unsupervised Learning",
    "content": "It is widely used for anomaly detection, data exploration, and pattern recognition.",
    "x": -7.8424261432727524,
    "y": 1.0166983559902785,
    "z": 9.302498429539833
  },
  {
    "id": 20,
    "title": "Recurrent Neural Networks (RNNs)",
    "content": "RNNs are designed to model sequential data by maintaining a memory of previous inputs.",
    "x": 0.9090051183974018,
    "y": 8.892625760963904,
    "z": 1.4047042397751197
  },
  {
    "id": 20.1,
    "title": "Recurrent Neural Networks (RNNs)",
    "content": "These networks are widely used in time-series analysis, natural language processing, and speech recognition.",
    "x": 1.1643526789634875,
    "y": 8.33461916334766,
    "z": 1.6651621070332425
  },
  {
    "id": 20.2,
    "title": "Recurrent Neural Networks (RNNs)",
    "content": "RNNs suffer from problems like vanishing gradients, which can make it difficult to learn long-term dependencies.",
    "x": 0.49121089250058686,
    "y": 9.584668924911075,
    "z": 2.0830961600375972
  },
  {
    "id": 20.3,
    "title": "Recurrent Neural Networks (RNNs)",
    "content": "Improvements, such as LSTMs and GRUs, have been developed to address the limitations of traditional RNNs.",
    "x": 0.9034457433033968,
    "y": 8.890249939364374,
    "z": 1.718753385552931
  }
];

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomColor() {
  const color = randomColor();
  return new THREE.Color(color);
}

// Shader de fragmento para generar texturas de planetas
const fragmentShader = `
  varying vec2 vUv;
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform float noiseScale;
  uniform float noiseStrength;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    for (int i = 0; i < 8; i++) { // Incrementa el número de octavas para más detalles
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 st = vUv * noiseScale;
    float n = fbm(st + time * 0.1) * noiseStrength;
    vec3 color = mix(color1, color2, n);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Shader de vértice
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const getPlanetMaterial = () => {
  return new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      time: { value: 0 },
      color1: { value: getRandomColor() },
      color2: { value: getRandomColor() },
      noiseScale: { value: Math.random() * 100 + 5 }, // Aumenta la escala del ruido
      noiseStrength: { value: Math.random() * 1.5 + 0.5 } // Aumenta la fuerza del ruido
    }
  });
}

interface DotData {
  id: number;
  title: string;
  content: string;
  position: THREE.Vector3;
  mesh: THREE.Mesh;
  explored: boolean;
}
const Planet = ({ texture }: { texture: any }) => {
  // Create a canvas and with Three.js draw a sphere with the given texture
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(100, 100);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(8, 32, 32);
    const material = texture || getPlanetMaterial();
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
    camera.position.z = 15;
    camera.lookAt(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01; // Rotar el planeta
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [texture]);

  return <div ref={mountRef} className="w-36 h-36" />;
};


const PlanetDrawer = (planets : any) => {
  // PlanetDrawer component
  // The user can visualize its saved planets as a list of planets
  // Given a list of planets, with a title and a texture
  // Plot the planets in a list

  // planets: {topic_id: texture}

  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    console.log(Object.entries(planets["planets"]));
  }, [planets]);

  return (
    <div className={
      isOpen ? `fixed top-0 right-0 p-4 w-1/4 h-full flex flex-col bg-black border-l border-gray-800` :
      `flex fixed top-4 right-4`
    }>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={
          isOpen ? `text-white` :
          `text-black h-10 w-36 rounded-xl shadow-lg border-l border-gray-800 bg-white`
        }
      > {isOpen ? "Close Drawer" : "Open Drawer"} </button>
    {
      isOpen && (
        <div className="">
            <div className="flex flex-col space-y-4 overflow-y-auto h-full w-full">
              {
                Object.entries(planets["planets"]).map(([topic_id, texture]) => (
                <>
                  <div className="flex flex-row gap-16 h-36 w-full">
                    <h1 key={topic_id} className="text-white text-md">
                      {topic_id} 
                    </h1>
                    <Planet key={topic_id} texture={texture} />
                  </div>
                </>
              ))}
            </div>
        </div>
      )
    }
    </div>
  );
}



const Dashboard = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedDotData, setSelectedDotData] = useState<DotData | null>(null);
  const [question, setQuestion] = useState('');
  const [dots, setDots] = useState<DotData[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const highlightMeshRef = useRef<THREE.Mesh | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isLearnMode, setIsLearnMode] = useState(false);

  const [planetTextures, setPlanetTextures] = useState<any>({});

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    
    const params = {
      count: 300000,
      size: 0.01,
      radius: 10,
      branches: 3,
      spin: 1,
      randomness: 1,
      randomnessPower: 1,
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
      center: { x: 10, y: 50, z: -20 }
    };

    const generateGalaxy = (scene: any, params: any, galaxygeometry: any, galaxymaterial: any, galaxypoints: any) => {
      if (galaxypoints) {
        scene.remove(galaxypoints);
        galaxymaterial.dispose();
        galaxygeometry.dispose();
      }

      // Galaxy

      galaxygeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(params.count * 3);
      const colors = new Float32Array(params.count * 3);

      const colorInside = new THREE.Color(params.insideColor);
      const colorOutside = new THREE.Color(params.outsideColor);

      for (let i = 0; i < params.count; i++) {
        const i3 = i * 3;

        const r = Math.random() * params.radius;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, r / params.radius);
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

        const branchIndex = i % params.branches;
        const branchAngle = branchIndex / params.branches;
        const rotation = branchAngle * Math.PI * 2;
        const spinAngle = r * params.spin;

        const randomX =
          Math.pow(Math.random(), params.randomnessPower) *
          (Math.random() - 0.5) *
          params.randomness *
          r;
        const randomY =
          Math.pow(Math.random(), params.randomnessPower) *
          (Math.random() - 0.5) *
          params.randomness *
          r;
        const randomZ =
          Math.pow(Math.random(), params.randomnessPower) *
          (Math.random() - 0.5) *
          params.randomness *
          r;

        // Apply the center to the position of the galaxy
        positions[i3] = Math.cos(rotation + spinAngle) * r + randomX + params.center.x;
        positions[i3 + 1] = randomY + params.center.y;
        positions[i3 + 2] = Math.sin(rotation + spinAngle) * r + randomZ + params.center.z;
      }

      // Branches

      galaxygeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      galaxygeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const pointsmaterial = new THREE.PointsMaterial({
        color: params.pointColor,
        size: params.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
      });

      galaxypoints = new THREE.Points(galaxygeometry, pointsmaterial);
      console.log(galaxypoints);
      scene.add(galaxypoints);

      console.log("generateGalaxy");
    };


    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0xffffff);
    renderer.setClearColor(0x000000);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const geometry = new THREE.SphereGeometry(0.08, 32, 32);
    const initialMaterial = new THREE.MeshStandardMaterial(
      { 
        color: 0xFFFFFF, 
        roughness: 0.4, 
        metalness: 0.3, 
        transparent: false, 
        emissive: 0xffffff,
        emissiveIntensity: 1,
      }
    );

    const highlightGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const highlightMaterial = new THREE.MeshBasicMaterial(
      { 
        color: 0xFFFFFF, 
        transparent: true, 
        opacity: 0.4,
        emissive: 0xffffff,
        emissiveIntensity: 0.3,
      });
    const highlightMesh = new THREE.Mesh(highlightGeometry, highlightMaterial);
    highlightMesh.visible = false;
    scene.add(highlightMesh);
    highlightMeshRef.current = highlightMesh;

    // generateGalaxy(scene, params);
    // Create random Galaxies for the background

    let galaxyCount = 10;

    for (let i = 0; i < galaxyCount; i++) {

      let galaxygeometry: any = null;
      let galaxymaterial: any = null;
      let galaxypoints: any = null;

      generateGalaxy(scene, {
        count: 300000,
        size: 0.01,
        radius: Math.random() * 50 + 10,
        branches: Math.floor(Math.random() * 5) + 3,
        spin: Math.random() * 2,
        randomness: Math.random() * 2,
        randomnessPower: Math.random() * 3,
        insideColor: randomColor(),
        outsideColor: randomColor(),
        pointColor: randomColor(),
        center: { x: Math.random() * 120 - 60, y: Math.random() * 120 - 60, z: Math.random() * 120 - 60 }
      }, galaxygeometry, galaxymaterial, galaxypoints);
    }

    const newDots: DotData[] = topics.map((topic) => {
      const dot = new THREE.Mesh(geometry, initialMaterial.clone());
      // Using the x, y, z coordinates from the JSON to position the dots
      dot.position.set(topic.x, topic.y, topic.z);
      scene.add(dot);
      return {
        id: topic.id,
        title: topic.title,
        content: topic.content,
        position: dot.position.clone(),
        mesh: dot,
        explored: false,
      };
    });

    setDots(newDots);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    // camera.position.z = 20;

    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = 3;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        const clickedDot = newDots.find(dot => dot.position.equals(intersects[0].object.position));
        if (clickedDot) {
          highlightDot(clickedDot);
          setSelectedDotData(clickedDot);
          
          // (clickedDot.mesh.material as THREE.MeshStandardMaterial).color.set(0x449977);
          // (clickedDot.mesh.material as THREE.MeshStandardMaterial).transparent = false;
          // (clickedDot.mesh.material as THREE.MeshStandardMaterial).opacity = 1;
          // (clickedDot.mesh.material as THREE.MeshStandardMaterial).emissive.set(0x44AA77);
          // (clickedDot.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1;

          
          
          clickedDot.explored = true;
          setIsSearchMode(false); // Set to false when a dot is clicked directly
          setIsLearnMode(false); // Reset learn mode when a new dot is clicked
        }
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const highlightDot = (dot: DotData) => {
    if (highlightMeshRef.current) {
      highlightMeshRef.current.position.copy(dot.position);
      highlightMeshRef.current.visible = true;
    }
  };

  const highlightRelatedDots = (baseId: number, title: string) => {
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0x86A4FF, transparent: true, opacity: 0.5 });
  
    dots.forEach(dot => {
      if (Math.floor(dot.id) === baseId || dot.title === title) {
        // Set the highlight material to all matching dots with the same title
        // dot.mesh.material = highlightMaterial.clone();  // Directly assign the new material
        // dot.mesh.material = getPlanetMaterial();

        // Create a new planet texture, and save it to the state, so it can be accessed later
        const planetTexture = planetTextures[`${dot.title}_${dot.id}`] || getPlanetMaterial();
        dot.mesh.material = planetTexture;
        var planetTexturesTemp = planetTextures;
        planetTexturesTemp[`${dot.title}_${dot.id}`] = planetTexture;

        setPlanetTextures(planetTexturesTemp);
        
        console.log(`${dot.title}_${dot.id}`)
        console.log("planetTextures", planetTextures);

      }
    });
  };

  const resetDotColors = () => {
    const defaultMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    dots.forEach(dot => {
      dot.mesh.material = defaultMaterial.clone();
    });
  };

  const handleNextOrPrevDot = (direction: 'next' | 'prev') => {
    if (!selectedDotData) return;

    const currentIndex = dots.findIndex(dot => dot.id === selectedDotData.id);
    const targetDot = direction === 'next'
      ? dots.slice(currentIndex + 1).find(dot => dot.title === selectedDotData.title)
      : dots.slice(0, currentIndex).reverse().find(dot => dot.title === selectedDotData.title);

    if (targetDot) {
      setSelectedDotData(targetDot);
      highlightDot(targetDot);
      highlightRelatedDots(Math.floor(targetDot.id), targetDot.title);

      if (cameraRef.current && controlsRef.current) {
        const targetPosition = targetDot.position.clone();
        const offset = new THREE.Vector3(0.2, 0.2, 0.5);
        const cameraTargetPosition = targetPosition.clone().add(offset);

        const startPosition = cameraRef.current.position.clone();
        const startControlsTarget = controlsRef.current.target.clone();
        const animationDuration = 1000;
        const startTime = Date.now();

        const animateCamera = () => {
          const elapsedTime = Date.now() - startTime;
          const progress = Math.min(elapsedTime / animationDuration, 1);

          cameraRef.current!.position.lerpVectors(startPosition, cameraTargetPosition, progress);
          controlsRef.current!.target.lerpVectors(startControlsTarget, targetPosition, progress);
          controlsRef.current!.update();

          if (progress < 1) {
            requestAnimationFrame(animateCamera);
          }
        };

        animateCamera();
      }
    }
  };

  const hasNextDot = selectedDotData
    ? dots.slice(dots.findIndex(dot => dot.id === selectedDotData.id) + 1).some(dot => dot.title === selectedDotData.title)
    : false;

  const hasPrevDot = selectedDotData
    ? dots.slice(0, dots.findIndex(dot => dot.id === selectedDotData.id)).some(dot => dot.title === selectedDotData.title)
    : false;

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = question.toLowerCase();

    const matchingDots = dots.filter(dot => 
      dot.title.toLowerCase().includes(query) || dot.content.toLowerCase().includes(query)
    );

    if (matchingDots.length > 0 && sceneRef.current && cameraRef.current && controlsRef.current) {
      const firstDot = matchingDots[0];
      const baseId = Math.floor(firstDot.id);

      const titleMatch = dots.find(dot => dot.title.toLowerCase().includes(query) && Number.isInteger(dot.id));
      const targetDot = titleMatch || firstDot;

      setSelectedDotData(targetDot);
      highlightDot(targetDot);
      highlightRelatedDots(baseId, targetDot.title);  // Highlight all dots with the same base ID or title

      const targetPosition = targetDot.position.clone();
      const offset = new THREE.Vector3(0.2, 0.2, 0.5);
      const cameraTargetPosition = targetPosition.clone().add(offset);

      const startPosition = cameraRef.current.position.clone();
      const startControlsTarget = controlsRef.current.target.clone();
      const animationDuration = 1000;
      const startTime = Date.now();

      const animateCamera = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        cameraRef.current!.position.lerpVectors(startPosition, cameraTargetPosition, progress);
        controlsRef.current!.target.lerpVectors(startControlsTarget, targetPosition, progress);
        controlsRef.current!.update();

        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        }
      };

      animateCamera();
      setIsSearchMode(true); // Set to true when a dot is found by searching
      setIsLearnMode(false); // Reset learn mode when a new dot is found by searching
    }

    setQuestion('');
  };

  const handleLearnClick = () => {
    resetDotColors();
    highlightRelatedDots(Math.floor(selectedDotData!.id), selectedDotData!.title);
    setIsSearchMode(true);
    setIsLearnMode(true);

    // Navigate to the selected dot
    if (cameraRef.current && controlsRef.current) {
      const targetPosition = selectedDotData!.position.clone();
      const offset = new THREE.Vector3(0.2, 0.2, 0.5);
      const cameraTargetPosition = targetPosition.clone().add(offset);

      const startPosition = cameraRef.current.position.clone();
      const startControlsTarget = controlsRef.current.target.clone();
      const animationDuration = 1000;
      const startTime = Date.now();

      const animateCamera = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        cameraRef.current!.position.lerpVectors(startPosition, cameraTargetPosition, progress);
        controlsRef.current!.target.lerpVectors(startControlsTarget, targetPosition, progress);
        controlsRef.current!.update();

        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        }
      };

      animateCamera();
    }
  };

  const getCurrentDotIndex = () => {
    if (!selectedDotData) return 0;
    const sameTitleDots = dots.filter(dot => dot.title === selectedDotData.title);
    return sameTitleDots.findIndex(dot => dot.id === selectedDotData.id) + 1;
  };

  const getTotalDotsWithTitle = () => {
    if (!selectedDotData) return 0;
    return dots.filter(dot => dot.title === selectedDotData.title).length;
  };

  return (
    <div className="h-screen w-screen bg-black-100 text-gray-900 relative">
      <div className="absolute top-4 left-4 space-y-4 w-80">
        <Card className="bg-white shadow-lg border border-gray-200 rounded-lg">
          <CardHeader>
            <CardTitle>
              {selectedDotData ? selectedDotData.title : 'Select a dot'}
              {selectedDotData && (
                <span className="text-sm text-gray-500 ml-2">
                  {getCurrentDotIndex()}/{getTotalDotsWithTitle()}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              {selectedDotData ? selectedDotData.content : 'Click on a dot to view its information.'}
            </p>
            {selectedDotData && (
              <div className="flex justify-end space-x-2">
                {!isLearnMode && !isSearchMode && (
                  <Button
                    onClick={handleLearnClick}
                    className="bg-black hover:bg-zinc-900 text-white"
                  >
                    Learn
                  </Button>
                )}
                {(isSearchMode || isLearnMode) && (
                  <>
                    <Button
                      onClick={() => handleNextOrPrevDot('prev')}
                      disabled={!hasPrevDot}
                      className="bg-black hover:bg-zinc-900 text-white disabled:bg-gray-400"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleNextOrPrevDot('next')}
                      disabled={!hasNextDot}
                      className="bg-black hover:bg-zinc-900 text-white disabled:bg-gray-400"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2/3 max-w-2xl">
        <form onSubmit={handleQuestionSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow bg-white text-gray-900 border-gray-300 h-12 rounded-full px-4"
          />
          <Button type="submit" className="bg-black hover:bg-zinc-900 text-white rounded-full h-12 w-12">
            <Send className='fill-white' size={36}/>
          </Button>
        </form>
        {/*Planet Drawer */}
      </div>
        { Object.keys(planetTextures).length > 0 &&
          <PlanetDrawer planets={planetTextures} />
        }
    </div>
  );
};

export default Dashboard;
