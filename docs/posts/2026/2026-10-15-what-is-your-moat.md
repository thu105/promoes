---
layout: Post
title: What Is Your Moat?
subtitle: Business Defensibility in the Age of AI
description: When AI lowers software development costs, which competitive advantages remain defensible?
date: 2026-10-15
author: Hein Thu
useHeaderImage: true
headerImage: /img/posts/what-is-your-moat.jpg
headerImageCredit: Katelyn G (@katelyn_g) on Unsplash
headerImageCreditLink: https://unsplash.com/photos/a-castle-sitting-on-top-of-a-lake-next-to-a-forest-4OtgPAqqPUo
headerMask: rgba(0, 0, 0, .5)
tags:
 - AI
 - Technology
 - BusinessStrategy
permalinkPattern: /post/:year/:month/:day/:slug/
---

*Technology & Business Strategy*

## 1. When Everyone Can Rent Intelligence

In [*Who Owns the Intelligence?*](./2026-10-14-who-owns-the-intelligence.md), I examined how artificial intelligence expands the productive capabilities of capital, allowing businesses to substitute technology for cognitive labor. Businesses do not need to own AI infrastructure to benefit from it: subscriptions and APIs provide access to capabilities that previously required substantial investments in people and infrastructure.

This can lower the cost of starting a business. A small team can use AI to develop software, automate operations, and deliver services that previously required a larger organization. Stanford's [2025 AI Index](https://hai.stanford.edu/ai-index/2025-ai-index-report/research-and-development) reported that inference prices for models matching GPT-3.5's performance on MMLU, a language-understanding benchmark, fell more than 280-fold between November 2022 and October 2024. This measures the price of a benchmark capability; it does not imply an equivalent reduction in the total cost of developing or operating a business.

## 2. The Economics of Replication

Software businesses have historically benefited from the time, expertise, and capital required to reproduce their products. Where AI reduces the engineering effort needed to deliver a reliable substitute, it lowers an entrant's fixed development costs. The model below examines the consequences of that reduction; cheaper inference alone does not establish its size. A competitor need only attract customers, potentially by targeting a profitable subset of an incumbent's functionality.

Public interfaces, documented APIs, and customer workflows can inform independently developed implementations. The [U.S. Copyright Office's guidance on computer programs](https://www.copyright.gov/circs/circ61.pdf) distinguishes protected software expression from functional aspects such as algorithms, functions, and system design. That distinction does not mean every product can be copied freely.

A simplified market-entry condition expresses the relationship between customer economics and entry costs:

$$
N(LTV - CAC) > F_d + F_o
$$

| Variable | Definition |
| --- | --- |
| $N$ | Expected number of customers acquired over the modeled period |
| $LTV$ | Expected lifetime contribution per customer after serving costs, including ongoing AI usage and support |
| $CAC$ | Expected acquisition cost per customer |
| $F_d$ | Fixed development costs |
| $F_o$ | Other fixed entry costs, including initial infrastructure setup, compliance, and operational preparation |

The model assumes average customer economics, consistent discounting, and that all relevant costs are included without double counting. Shared ongoing overhead must also be covered; here it is allocated across customers in $LTV$. The inequality describes expected economic viability, not the timing of cash flows or the financing needed before revenues arrive.

Holding customer economics and other costs constant, lower $F_d$ makes smaller markets commercially viable. For example, if each customer contributes \$1,000 after serving and acquisition costs, reducing total fixed entry costs from \$500,000 to \$100,000 lowers the break-even customer count from 500 to 100. These are hypothetical figures illustrating the mechanism, not estimates of AI's actual effect.

AI can also change acquisition costs, serving costs, and customer retention. If easier entry brings credible substitutes into a market, lower prices or higher customer churn can reduce $LTV$, offsetting an entrant's initial savings and weakening incumbents' pricing power. The outcome depends on whether competitors can reproduce customer value, reach buyers, and operate reliably at a sustainable cost.

Production-ready software still requires security, integrations, exception handling, and operational maturity. Reproducing a feature is therefore less demanding than reproducing the business infrastructure that makes customers willing to depend on it.

## 3. AI Startups and Platform Dependency

AI startups face an additional risk: their technology suppliers can become their competitors. An application built around a foundation model depends on capabilities controlled by another company. That provider may introduce equivalent functionality, bundle it into an existing service, or offer it through its own interface and customer relationships.

OpenAI's [February 2025 introduction of deep research](https://openai.com/index/introducing-deep-research/) brought automated research directly into ChatGPT. Its [October 2025 introduction of apps in ChatGPT](https://openai.com/index/introducing-apps-in-chatgpt/) expanded the platform's role in application distribution. These launches illustrate two mechanisms: a provider can supply application functionality itself or become a channel through which third-party applications reach users. The latter also creates opportunities for developers; it does not by itself demonstrate that their businesses will be displaced.

A startup can consequently face competition from established software vendors incorporating AI, other startups using similar models, and the model provider itself. Exposure is greatest when the product's value comes primarily from prompting, orchestration, or presentation that competitors can readily reproduce.

## 4. What Actually Makes a Business Defensible?

A competitive moat is a structural advantage that allows a business to sustain returns above its cost of capital despite competition. David Teece's [1986 research on profiting from technological innovation](https://doi.org/10.1016/0048-7333(86)90027-2) explains why innovators do not necessarily capture the returns from their inventions: when imitation is easy, profits can accrue to owners of complementary assets needed to commercialize the innovation. Applying that framework to AI suggests that advantages surrounding software become more consequential as functionality becomes easier to reproduce.

| Potential advantage | Economic mechanism | Condition for defensibility |
| --- | --- | --- |
| Proprietary data | Improves decisions or product outcomes | Rivals cannot obtain equivalent information, and the business can legally use it |
| Distribution | Reduces acquisition costs or improves access to buyers | Customer access is difficult or expensive for competitors to reproduce |
| Network effects | Additional participants increase value for other users | A competing network cannot readily offer equivalent value at smaller scale |
| Workflow integration | Migration requires changing processes, integrations, and employee habits | The cost and risk of switching exceed the expected benefits |
| Operational maturity | Proven reliability, security, compliance, and accountability reduce customer risk | A rival needs meaningful time and investment to establish comparable performance and trust |
| Specialized expertise | Domain knowledge improves execution and handles difficult exceptions | The expertise remains scarce and produces measurable customer value |

Switching costs could decline if AI makes migration, configuration, and retraining cheaper; the magnitude depends on how much of the transition can be automated and verified.

An established software-as-a-service (SaaS) provider may retain customers after competitors reproduce its features because replacing it requires migrating historical data, validating integrations, retraining employees, and accepting operational risk. A standalone application with interchangeable functionality and inexpensive migration has less protection against price competition. Historical engineering expenditure alone does not establish a moat.

## 5. What Is Your Moat?

When companies pitch their business ideas, one question I consistently ask is: **What is your moat?** AI makes development difficulty a less reliable answer wherever competitors can use similar tools to reproduce the core functionality. A business should be able to explain why customers would continue choosing it if a capable entrant offered a comparable product at a lower price.

1. **What cannot be reproduced economically?** Identify the scarce asset or capability, the time and cost required to match it, and why equivalent substitutes are unavailable.
2. **How does that advantage affect the business?** Connect it to better customer outcomes, lower acquisition or operating costs, greater retention, or sustained willingness to pay.
3. **What could erode it?** Examine improvements in AI, easier migration, alternative data sources, and the possibility that a model provider bundles the core functionality.

Businesses can still operate profitably with modest protection: specialization, execution, and a small market may limit competitive pressure. Sustaining substantial excess returns is harder because those returns give entrants a stronger incentive to overcome the remaining barriers.

## Conclusion

Where AI lowers replication costs, development difficulty provides less protection against entry. Sustained returns above the cost of capital depend on advantages that rivals cannot economically reproduce; a profitable business alone does not establish a moat.

## Related Posts

- [Who Owns the Intelligence?](./2026-10-14-who-owns-the-intelligence.md) — How AI substitution changes labor demand, worker bargaining power, and the distribution of productivity gains.

## References and Further Reading

1. Stanford HAI. (2025). [AI Index Report: Research and Development](https://hai.stanford.edu/ai-index/2025-ai-index-report/research-and-development).
2. U.S. Copyright Office. [Copyright Registration of Computer Programs, Circular 61](https://www.copyright.gov/circs/circ61.pdf).
3. Teece, D. J. (1986). [Profiting from Technological Innovation: Implications for Integration, Collaboration, Licensing and Public Policy](https://doi.org/10.1016/0048-7333(86)90027-2). *Research Policy, 15*(6), 285–305.
4. OpenAI. (2025, February 2). [Introducing Deep Research](https://openai.com/index/introducing-deep-research/).
5. OpenAI. (2025, October 6). [Introducing Apps in ChatGPT and the New Apps SDK](https://openai.com/index/introducing-apps-in-chatgpt/).

## Future Topics

- **Platform dependency:** How foundation-model providers capture value from downstream application businesses.
- **AI and SaaS pricing:** How declining development costs affect software margins and subscription models.
- **Open models and competitive advantage:** Whether increasingly capable open-weight models weaken frontier providers' economic moats.
