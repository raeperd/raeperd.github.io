---
date: 2024-01-10
tags:
  - cs
url: https://en.wikipedia.org/wiki/Technical_debt
aliases:
  - 기술부채
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/f2XkeDZnn4E?si=iYPQSfe9jhEJXibJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- Technical depth is the implied cost of additional rework caused by choosing an easy solution now instead of using a better approach that would take longer
- Time consuming != difficulty
	- 많은 경우에 빠르게 기능을 배포해야 하는 경우 기술적으로 올바른 방법을 따르지 않을 수 있다.
		- 그럼에도 최소한의 기능을 테스트하는 코드는 반드시 필요하다. 
	- Technical debt 를 해결하기 위해 주기적으로 코드를 재점검 할 필요가 있다. 
		- 아마 이때 미리 작성해둔 테스트가 주요하게 작용할 것이다. 
- Technical Debt 는 나쁜 것 만은 아니다. 지금 작성하는 코드가 Technical debt 를 가지고 있다는 것을 알고, 이를 언제 pay off 할지 결정하는 것은 괜찮다. 나쁜 것은 인지하지 못한채로 만드는 Technical debt다.

## Reference
- [How your "Sr." Devs incurred Technical Debt - CodeOpinion](https://codeopinion.com/how-your-sr-devs-incurred-technical-debt/)
- [Hey, Junior Dev! This is is how your "Sr." Devs built a mess. - YouTube](https://youtu.be/f2XkeDZnn4E?t=157)
