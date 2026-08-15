---
layout: archive
title: "CV"
title_zh: "简历"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Research interests
======
Speech recognition, with a focus on multi-speaker ASR, low-resource ASR, and
streaming ASR. Related interests in speech translation, speech synthesis, and
efficient on-device speech models.

Education
======
* Ph.D. in Pattern Recognition and Intelligent Systems, Sep 2026 – present
  * Shanghai Innovation Institute & Institute of Automation, Chinese Academy of Sciences
  * Advisors: Prof. Jiajun Zhang and Assoc. Prof. Xie Chen

* Visiting Student, Jan 2025 – May 2025
  * University of California, Berkeley

* B.Eng. in Artificial Intelligence, Sep 2022 – Jun 2026
  * School of Artificial Intelligence, University of Chinese Academy of Sciences

Experience
======
* Research Intern, Oct 2025 – present
  * Microsoft Research Asia (MSRA), General Artificial Intelligence group
  * Advisors: Dr. Jianwei Yu and Dr. Zhiliang Peng
  * VibeVoice-ASR, long-form speech understanding that unifies recognition,
    diarization, and timestamping, and its BitNet-quantized variant for
    real-time inference on edge CPUs

* Summer Intern, Jun 2025 – Sep 2025
  * ByteDance, TikTok

* Research Intern, Mar 2024 – present
  * X-LANCE Lab (Cross Media Language Intelligence), Shanghai Jiao Tong University
  * Advisor: Assoc. Prof. Xie Chen
  * Multilingual benchmarking and streaming recognition, including
    GigaSpeechBench and X-ASR

* Undergraduate Research and Thesis, 2024 – 2026
  * Institute of Automation, Chinese Academy of Sciences
  * Advisor: Assoc. Prof. Bin Liu

Awards
======
* Second-Class Academic Scholarship, University of Chinese Academy of Sciences
* Third-Class Academic Scholarship, University of Chinese Academy of Sciences

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Open-source projects
======
* [microsoft/VibeASR.cpp](https://github.com/microsoft/VibeASR.cpp) — VibeVoice-ASR-BitNet,
  a compressed VibeVoice-ASR variant for real-time multilingual speech
  recognition on edge CPUs, using INT8 acoustic tokenization and ternary
  language-model weights
* [SpeechColab/GigaSpeechBench](https://github.com/SpeechColab/GigaSpeechBench) — a
  680-hour real-world multilingual ASR and AST benchmark spanning low-resource
  languages, dialects, accents, domains, and age groups
* [Gilgamesh-J/X-ASR](https://github.com/Gilgamesh-J/X-ASR) — streaming-focused
  ASR models; the first release is a 160M-parameter Chinese-English Zipformer
  transducer trained on approximately one million hours of speech, unifying
  offline and true streaming recognition with sherpa-onnx deployment
* [microsoft/VibeVoice](https://github.com/microsoft/VibeVoice) — open-source
  frontier voice AI; VibeVoice-ASR handles up to 60 minutes of audio in a
  single pass across 50+ languages
* [SWivid/Habibi-TTS](https://github.com/SWivid/Habibi-TTS) — the first
  open-source unified-dialectal Arabic TTS framework, covering 12+ regional
  dialects
