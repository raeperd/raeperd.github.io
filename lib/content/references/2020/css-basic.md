---
title: CSS Basic
date: 2020-10-30
tags: [html, css, programming ]
---

[HTML Basic](https://reyzy.github.io/web/2019/08/17/HTML-basic/ ) 과 같은 맥락으로 블로그를 만들면서 CSS 에 대해 공부한 내용을 정리한다. 생활코딩 덕분에 간단하게 정리할 수 있었음 ! 다보고 나니 Javascript 까지 봐야 본격적으로 블로그를 만져볼 수 있겠다는 걸 알게되었다. 

# Before CSS
{{< codepen id="MEROqR" >}}

- `font` 태그를 이용해서 색을 변경할 수는 있다. 
- 스타일에 대한 요구사항이 변경된다면, 변경이 어려울 것이다. 
- 좀 더 근본적인 해결책이 필요하다. 

# After CSS 
{{< codepen id="eGoydN" >}}

- `<style></style>` 브라우저야! 이 내용은 css 이니까 css 문법에 맞게 해석해!
- 위의 HTML 코드를 CSS로 하면 이렇게 간단하게 처리할 수 있다. 

# CSS의 기본 문법
{{< codepen id="aboZVbg" >}}

- 태그의 `style` 속성이 전달되는 값이 CSS 임을 나타낸다.
- `style` 속성 자체는 HTML 코드다.

## HTML에 CSS 속성을 적용하는 두가지 방법
1. `<style></style>` 태그를 사용한다.
2. `style = "" ` 속성을 사용한다.

## CSS 문법의 구성    

### CSS 속성 스스로 알아내기
{{< codepen id="vewgrX" >}}
- 당연히 구글은 모든 것을 알고 있다. 
- 검색의 키워드는 "CSS text size property" 정도면 충분

## CSS 선택자
### class 선택자
{{< codepen id="mdbEKbY" >}}
- HTML 태그는 `class` 속성을 가질 수 있다.
- CSS의 선택자를 통해 `class` 의 특징을 정의할 수 있다.
- 여러개의 class 를 적용하면 가장 마지막의 하나의 class 특징만 적용된다.

### id선택자
{{< codepen id="yLBJELM" >}}
- id 선택자는 class 선택자보다 우선권을 가진다.
- id 의 값은 단 한번만 등장해야 한다. 더 구체적인 선택자이다.

# 박스 모델
- 이런 페이지를 만들고자 하는데, 박스 모델이라는 개념이 필요하다.
{{< codepen id="XWrKYmV" >}}
- `<h1>` 태그는 페이지의 전부를 사용하지만, `<a>` 태그는 일부만을 사용한다. 
- `<h1>` 과 같은 태그를 block element, `<a>` 와 같은 태그를 inline element 라고 한다. 

```css
<style>
h1, a {
    border: 5px solid red;
}
```
- 이렇게 코드의 중복을 제거할 수도 있다.

## border, padding, margin, width
![css box model]()

## in code,
{{< codepen id="EwzXad" >}}

## in browser,
![image]()
- 웹 브라우저에서 우클릭 -> inspect 를 이용해 디버깅을 할 수 있다. 

## 박스 모델 써먹기
{{< codepen id="vewZzX" >}}
- 위에서 사용한 방법만을 이용해서 이정도까지 충분히 구현할 수 있다!

# 그리드
{{< codepen id="oGRaeM" >}}
- `<div></div>` 아무 의미가 없는, 단순히 구분만을 위한 block level 태그
- `<span></span>` 마찬가지로 아무 의미 없는, 구분만을 위한 inline level 태그 
- 실제 그리드를 적용하는 부분은 `display: grid;` 부분이다. 
- `1fr` 화면의 크기에 대한 비율 총 `fr` 중 이만큼의 비율을 가져간다. 
- 유용한 기능이지만 지원하는 브라우저가 제한적이긴 하다. [참고](https://caniuse.com/#search=grid)  

{{< codepen id="XewxQE" >}}
- `#grid ol` 과 같은 한정자도 가능하다.

# 미디어 쿼리
{{< codepen id="ZXNwda" >}}
- 화면의 크기가 800px 보다 작다면, 표시하지 않는다.

## 개선된 홈페이지
{{< codepen id="dVErpx" >}}
- 더 다양한 환경에서 다양한 반응이 필요하다면 미디어 쿼리를 더 공부해보면 된다. 

# CSS 코드의 재사용
```html
<html>
   	<head>
    	<link rel="stylesheet" href="style.css"> 
    </head>
    <body>
    </body>
</html>
```
- 지저분한 스타일 코드는 이렇게 분리해낼 수 있다. 

# Reference
1. [생활코딩 WEB2 CSS ](https://opentutorials.org/module/3129/18333)