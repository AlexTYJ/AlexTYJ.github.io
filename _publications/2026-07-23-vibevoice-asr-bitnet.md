---
title: "VibeVoice-ASR-BitNet Technical Report"
collection: publications
category: multi_speaker_asr
permalink: /publication/2026-07-23-vibevoice-asr-bitnet
header:
  teaser: publications/2026-07-23-vibevoice-asr-bitnet.webp
excerpt: 'VibeVoice-ASR-BitNet compresses VibeVoice-ASR for real-time multilingual recognition on edge CPUs through heterogeneous quantization, custom SIMD kernels, and fused operators. It is 1.6-2.3x faster than Whisper.cpp at comparable model sizes. <br/><a href="https://github.com/microsoft/VibeASR.cpp"><img src="https://img.shields.io/github/stars/microsoft/VibeASR.cpp?style=social" alt="GitHub stars"></a>'
date: 2026-07-23
venue: 'arXiv preprint arXiv:2607.21075'
paperurl: 'https://arxiv.org/abs/2607.21075'
citation: 'S. Xu, T. Song, S. Huang, Z. Peng, Y. Xia, <b>Y. Tu</b>, X. Huang, X. Wu, W. Wang, Y. Chang, J. Yu, L. Dong, and F. Wei. (2026). &quot;VibeVoice-ASR-BitNet Technical Report.&quot; <i>arXiv preprint arXiv:2607.21075</i>.'
---

VibeVoice-ASR-BitNet is a compressed variant of VibeVoice-ASR optimized for real-time inference on edge CPUs. It applies full-pipeline INT8 quantization to the VAE acoustic tokenizer and BitNet-style ternary weights to the autoregressive language model, while progressive quantization-aware training preserves accuracy. Custom SIMD kernels and fused ggml operators target both ARM and x86 platforms, achieving real-time recognition on low-thread-count CPUs.

[![GitHub stars](https://img.shields.io/github/stars/microsoft/VibeASR.cpp?style=social)](https://github.com/microsoft/VibeASR.cpp)

[Paper](https://arxiv.org/abs/2607.21075){: .btn .btn--info}
[Code](https://github.com/microsoft/VibeASR.cpp){: .btn .btn--success}
[Microsoft Research](https://www.microsoft.com/en-us/research/publication/vibevoice-asr-bitnet-technical-report/){: .btn .btn--warning}