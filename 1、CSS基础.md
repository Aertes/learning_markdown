### position 属性六个属性和区别

1. static
2. relative
3. absoulute
4. fixed
5. sticky
6. inherit

#### 一、static

- static 是 position 的默认值，就是没有定位，元素处于现在正常的文档流中。

#### 二、relative

- relative 是相对定位，指的是给元素设置相对于自己原本位置的定位，元素并不脱离文档流，因此元素原本的位置会被保留，其他的元素位置不会受到影响。

#### 三、absolute 

- absolute 是绝对定位，是指给元素相对 static 定位之外的第一个父元素进行定位，分为两种情况：
  1. 设置了 absolute 的元素如果存在有父元素设置了 position 属性为 relative 或者 absolute，此时该元素就以这些父元素来进行定位。
  2. 如果没有设置了 position 属性为 relative 或者 absolute 父元素，则此时相对于 body 进行定位。
- absolute 是生成的绝对定位的元素，是会脱离文档流的，即在文档中已经不占据位置，常用于结合 relative 来使用。

#### 四、fixed

- fixed 是一种特殊的绝对定位，也会脱离文档流，只不过 fixed 的元素是固定相对于 body 来定位的。

#### 五、sticky

- sticky 是粘性定位，可以是相对定位 relative 和 固定定位 fixed 的结合体，一开始是没有脱离文档流的，但是当元素距离其父元素的距离达到 sticky 粘性定位的要求时，position : sticky 这时的效果相当于 fixed 定位，固定到适合的位置，脱离了文档流。

#### 六、inherit

- inherit 就是继承父元素的 position 属性。