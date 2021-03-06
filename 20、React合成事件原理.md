### react 事件机制
- 由于fiber 机制的特点，生成一个fiber节点时，它对应的dom节点有可能未挂载，onClick这样的事件处理函数作为fiber节点的prop，也就不能直接被绑定到真实的DOM节点上。为此，React提供了一种“顶层注册，事件收集，统一触发”的事件机制。所谓“顶层注册”，其实是在root元素上绑定一个统一的事件处理函数。“事件收集”指的是事件触发时（实际上是root上的事件处理函数被执行），构造合成事件对象，按照冒泡或捕获的路径去组件中收集真正的事件处理函数。“统一触发”发生在收集过程之后，对所收集的事件逐一执行，并共享同一个合成事件对象。这里有一个重点是绑定到root上的事件监听并非我们写在组件中的事件处理函数，注意这个区别，下文会提到。以上是React事件机制的简述，这套机制规避了无法将事件直接绑定到DOM节点上的问题，并且能够很好地利用fiber树的层级关系来生成事件执行路径，进而模拟事件捕获和冒泡，另外还带来两个非常重要的特性：
  - 对事件进行归类，可以在事件产生的任务上包含不同的优先级
  - 提供合成事件对象，抹平浏览器的兼容性差异
### React 事件注册
- 与之前版本不同，React17的事件是注册到root上而非document，这主要是为了渐进升级，避免多版本的React共存的场景中事件系统发生冲突。
- 当我们为一个元素绑定事件时，会这样写：
  ```js
    <div onClick={() => {/*do something*/}}>React</div>
  ```
- 这个div节点最终要对应一个fiber节点，onClick则作为它的prop。当这个fiber节点进入render阶段的complete阶段时，名称为onClick的prop会被识别为事件进行处理。
  ```js
    function setInitialDOMProperties(
      tag: string,
      domElement: Element,
      rootContainerElement: Element | Document,
      nextProps: Object,
      isCustomComponentTag: boolean,
    ): void {
      for (const propKey in nextProps) {
        if (!nextProps.hasOwnProperty(propKey)) {
          ...
        } else if (registrationNameDependencies.hasOwnProperty(propKey)) {
            // 如果propKey属于事件类型，则进行事件绑定
            ensureListeningTo(rootContainerElement, propKey, domElement);
          }
        }
      }
    }
  ```
- registrationNameDependencies是一个对象，存储了所有React事件对应的原生DOM事件的集合，这是识别prop是否为事件的依据。如果是事件类型的prop，那么将会调用ensureListeningTo去绑定事件。
- 接下来的绑定过程可以概括为如下几个关键点：
  1. 根据React的事件名称寻找该事件依赖，例如onMouseEnter事件依赖了mouseout和mouseover两个原生事件，onClick只依赖了click一个原生事件，最终会循环这些依赖，在root上绑定对应的事件。例如组件中为onClick，那么就会在root上绑定一个click事件监听。
  2. 依据组件中写的事件名识别其属于哪个阶段的事件（冒泡或捕获），例如onClickCapture这样的React事件名称就代表是需要事件在捕获阶段触发，而onClick代表事件需要在冒泡阶段触发。
  3. 根据React事件名，找出对应的原生事件名，例如click，并根据上一步来判断是否需要在捕获阶段触发，调用addEventListener，将事件绑定到root元素上。
  4. 若事件需要更新，那么先移除事件监听，再重新绑定，绑定过程重复以上三步。
   ```js
    // 根据事件名称，创建不同优先级的事件监听器。
    let listener = createEventListenerWrapperWithPriority(
      targetContainer,
      domEventName,
      eventSystemFlags,
      listenerPriority,
    );
  
    // 绑定事件
    if (isCapturePhaseListener) {
      ...
      unsubscribeListener = addEventCaptureListener(
        targetContainer,
        domEventName,
        listener,
      );
    } else {
      ...
      unsubscribeListener = addEventBubbleListener(
        targetContainer,
        domEventName,
        listener,
      );
  
    }
   ```
### 事件监听器 listener
- 上面提到的绑定事件的时候，绑定到root上的事件监听函数是listener，然而这个listener并不是我们直接在组件里写的事件处理函数。通过上面的代码可知，listener是createEventListenerWrapperWithPriority的调用结果。
为什么要创建这么一个listener，而不是直接绑定写在组件里的事件处理函数呢？
- 其实createEventListenerWrapperWithPriority这个函数名已经说出了答案：依据优先级创建一个事件监听包装器。有两个重点：优先级和事件监听包装器。这里的优先级是指事件优先级（关于事件优先级的详细介绍请移步React中的优先级 ）。
- 事件优先级是根据事件的交互程度划分的，优先级和事件名的映射关系存在于一个Map结构中。createEventListenerWrapperWithPriority会根据事件名或者传入的优先级返回不同级别的事件监听包装器。
- 总的来说，会有三种事件监听包装器：
  1. `dispatchDiscreteEvent`: 处理离散事件
  2. `dispatchUserBlockingUpdate`：处理用户阻塞事件
  3. `dispatchEvent`：处理连续事件
- 这些包装器是真正绑定到root上的事件监听器listener，它们持有各自的优先级，当对应的事件触发时，调用的其实是这个包含优先级的事件监听。
 <img src='./files/img/640.webp'>

`DOMEventPluginSystem` 事件处理总结：
- 顶级委托用于捕获大多数本机浏览器事件。 这可能只发生在主线程中并且是由 `ReactDOMEventListener`，它是注入的，因此可以支持可插入的事件源。 这是主要发生的唯一工作线。
- 我们对事件进行规范化和去重以解决浏览器的怪癖。 这可以在工作线程中完成。
- 转发这些原生事件（使用关联的顶级类型用于将其捕获）到 `EventPluginRegistry`，这反过来会询问插件是否需要提取任何合成事件。
- `EventPluginRegistry` 然后将通过使用注释来处理每个事件`dispatches`，一系列关注该事件的侦听器和 ID。
-  `EventPluginRegistry` 然后调度事件。
-  React 和事件系统概述：
  <img src='./files/img/ReactEvent_Listener.png'>
### 透传事件执行阶段标志
  - 到这里我们先梳理一下，root上绑定的是这个持有优先级的事件监听，触发它会使组件中真实的事件得以触发。但到目前为止有一点并未包括在内，也就是事件执行阶段的区分。组件中注册事件虽然可以以事件名 + “Capture”后缀的形式区分将来的执行阶段，但这和真正执行事件其实是两回事，所以现在关键在于如何将注册事件时显式声明的执行阶段真正落实到执行事件的行为上。
  - 关于这一点我们可以关注createEventListenerWrapperWithPriority函数中的其中一个入参：eventSystemFlags。它是事件系统的一个标志，记录事件的各种标记，其中一个标记就是IS_CAPTURE_PHASE，这表明了当前的事件是捕获阶段触发。当事件名含有Capture后缀时，eventSystemFlags会被赋值为IS_CAPTURE_PHASE。
  - 之后在以优先级创建绑定到root上的事件监听时，eventSystemFlags会作为它执行时的入参，传递进去。因此，在事件触发的时候就可以知道组件中的事件是以冒泡或是捕获的顺序执行。
  ```js
    function dispatchDiscreteEvent(
      domEventName,
      eventSystemFlags,
      container,
      nativeEvent,
    ) {
      ...
      discreteUpdates(
        dispatchEvent,
        domEventName,
        eventSystemFlags, // 传入事件执行阶段的标志
        container,
        nativeEvent,
      );
    }
  ```
   - 小结：
     - 事件处理函数不是绑定到组件的元素上的，而是绑定到root上，这和fiber树的结构特点有关，即事件处理函数只能作为fiber的prop。
     - 绑定到root上的事件监听不是我们在组件里写的事件处理函数，而是一个持有事件优先级，并能传递事件执行阶段标志的监听器。
### 事件触发
- 负责以不同的优先级权重来触发真正的事件流程，并传递事件执行阶段标志（`eventSystemFlags`）。比如一个元素绑定了onClick事件，那么点击它的时候，绑定在root上的listener会被触发，会最终使得组件中的事件被执行。也就是说绑定到root上的事件监听listener只是相当于一个传令官，
- 它按照事件的优先级去安排接下来的工作：
  - `事件对象的合成、`
  - `将事件处理函数收集到执行路径、` 
  - `事件执行，`
  - 这样在后面的调度过程中，`scheduler`才能获知当前任务的优先级，然后展开调度。
- 优先级传递：
  - 利用`scheduler`中的`runWithPriority`函数，通过调用它，将优先级记录到利用`scheduler`中，所以调度器才能在调度的时候知道当前任务的优先级。`runWithPriority`的第二个参数，会去安排上面提到的三个工作。
  - 以用户阻塞的优先级级别为例：
  ```js
    function dispatchUserBlockingUpdate(
      domEventName,
      eventSystemFlags,
      container,
      nativeEvent,
    ) {
        ...
        runWithPriority(
          UserBlockingPriority,
          dispatchEvent.bind(
            null,
            domEventName,
            eventSystemFlags,
            container,
            nativeEvent,
          ),
        );
    }
  ```
  - `dispatchUserBlockingUpdate`调用`runWithPriority`，并传入`UserBlockingPriority`优先级，这样就可以将`UserBlockingPriority`的优先级记录到`Scheduler`中，后续React计算各种优先级都是基于这个`UserBlockingPriority`优先级。
  - 除了传递优先级，它做的其它重要的事情就是触发事件对象的合成、将事件处理函数收集到执行路径、 事件执行这三个过程，也就是到了事件的执行阶段。`root`上的事件监听最终触发的是`dispatchEventsForPlugins`。
  - 这个函数体可看成两部分：
    - 事件对象的合成和事件收集 
    - 事件执行
    - 涵盖了上述三个过程
    ```js
    function dispatchEventsForPlugins(
      domEventName: DOMEventName,
      eventSystemFlags: EventSystemFlags,
      nativeEvent: AnyNativeEvent,
      targetInst: null | Fiber,
      targetContainer: EventTarget,
    ): void {
      const nativeEventTarget = getEventTarget(nativeEvent);
      const dispatchQueue: DispatchQueue = [];
    
      // 事件对象的合成，收集事件到执行路径上 收集listener模拟冒泡
      extractEvents(
        dispatchQueue,
        domEventName,
        targetInst,
        nativeEvent,
        nativeEventTarget,
        eventSystemFlags,
        targetContainer,
      );
    
      // 执行收集到的组件中真正的事件 执行队列
      processDispatchQueue(dispatchQueue, eventSystemFlags);
    }
    ```
  - `dispatchEventsForPlugins`函数中事件的流转有一个重要的载体：`dispatchQueue`，它承载了本次合成的事件对象和收集到事件执行路径上的事件处理函数。
  - `listeners`是事件执行路径，`event`是合成事件对象，收集组件中真正的事件到执行路径，以及事件对象的合成通过`extractEvents`实现。
- 事件对象的合成和事件的收集
  - root上的事件监听被触发会引发事件对象的合成和事件的收集过程，这是为真正的事件触发做准备。
- 合成事件对象
  - 在组件中的事件处理函数中拿到的事件对象并不是原生的事件对象，而是经过React合成的SyntheticEvent对象。它解决了不同浏览器之间的兼容性差异。抽象成统一的事件对象，解除开发者的心智负担。
- 事件执行路径
  - 当事件对象合成完毕，会将事件收集到事件执行路径上。什么是事件执行路径呢？
  - 在浏览器的环境中，若父子元素绑定了相同类型的事件，除非手动干预，那么这些事件都会按照冒泡或者捕获的顺序触发。
  - 在React中也是如此，从触发事件的元素开始，依据fiber树的层级结构向上查找，累加上级元素中所有相同类型的事件，最终形成一个具有所有相同类型事件的数组，这个数组就是事件执行路径。通过这个路径，React自己模拟了一套事件捕获与冒泡的机制。
  - 下图是事件对象的包装和收集事件（冒泡的路径为例）的大致过程:
   <img src='./files/img/641.webp'>
  - 因为不同的事件会有不同的行为和处理机制，所以合成事件对象的构造和收集事件到执行路径需要通过插件实现。一共有5种Plugin：`SimpleEventPlugin`，`EnterLeaveEventPlugin`，`ChangeEventPlugin`，`SelectEventPlugin`，`BeforeInputEventPlugin`。它们的使命完全一样，只是处理的事件类别不同，所以内部会有一些差异。本文只以`SimpleEventPlugin`为例来讲解这个过程，它处理比较通用的事件类型，比如`click`、`input`、`keydown`等。
  - 以下是`SimpleEventPlugin`中构造合成事件对象并收集事件的代码:
    ```js
      function extractEvents(
        dispatchQueue: DispatchQueue,
        domEventName: DOMEventName,
        targetInst: null | Fiber,
        nativeEvent: AnyNativeEvent,
        nativeEventTarget: null | EventTarget,
        eventSystemFlags: EventSystemFlags,
        targetContainer: EventTarget,
      ): void {
        const reactName = topLevelEventsToReactNames.get(domEventName);
        if (reactName === undefined) {
          return;
        }
        let EventInterface;
        // 根据不同的事件来创建不同的合成事件
          switch (domEventName) {
            case 'keypress':
            case 'keydown':
            case 'keyup':
              SyntheticEventCtor = SyntheticKeyboardEvent;
              break;
            case 'click':
            // ...
            case 'mouseover':
              SyntheticEventCtor = SyntheticMouseEvent;
              break;
            case 'drag':
            // ...
            case 'drop':
              SyntheticEventCtor = SyntheticDragEvent;
              break;
            // ...
            default:
              break;
          }
        // 构造合成事件对象
        const event = new SyntheticEvent(
          reactName,
          null,
          nativeEvent,
          nativeEventTarget,
          EventInterface,
        );
    
        const inCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0;
    
        if (/*...*/) {
          ...
        } else {
          // scroll事件不冒泡
          const accumulateTargetOnly =
            !inCapturePhase &&
            domEventName === 'scroll';
    
          // 事件对象分发 & 收集事件
          accumulateSinglePhaseListeners(
            targetInst,
            dispatchQueue,
            event,
            inCapturePhase,
            accumulateTargetOnly,
          );
        }
        return event;
      }
    ```
- 创建合成事件对象
  - 这个统一的事件对象由`SyntheticEvent`函数构造而成，它自己遵循W3C的规范又实现了一遍浏览器的事件对象接口，这样可以抹平差异，而原生的事件对象只不过是它的一个属性（`nativeEvent`）。
- 收集事件到执行路径
  - 这个过程是将组件中真正的事件处理函数收集到数组中，等待下一步的批量执行。
  - 先看一个例子，目标元素是`counter`，父级元素是`counter-parent`。
    ```js
    class EventDemo extends React.Component{
      state = { count: 0 }
      onDemoClick = () => {
        console.log('counter的点击事件被触发了');
        this.setState({
          count: this.state.count + 1
        })
      }
      onParentClick = () => {
        console.log('父级元素的点击事件被触发了');
      }
      render() {
        const { count } = this.state
        return <div
          className={'counter-parent'}
          onClick={this.onParentClick}
        >
          <div
            onClick={this.onDemoClick}
            className={'counter'}
          >
            {count}
          </div>
        </div>
      }
    }
    // 当点击counter时，父元素上的点击事件也会被触发，相继打印出：
    // 输出：
    // 'counter的点击事件被触发了'
    // '父级元素的点击事件被触发了'
    ```
  - 实际上这是将事件以冒泡的顺序收集到执行路径之后导致的。收集的过程由`accumulateSinglePhaseListeners`完成。`accumulateSinglePhaseListeners`函数里就是在向上层遍历来收集一个列表后面会用来模拟冒泡。
  - `accumulateSinglePhaseListeners`函数内部最重要的操作无疑是收集事件到执行路径，为了实现这一操作，需要在fiber树中从触发事件的源fiber节点开始，向上一直找到root，形成一条完整的冒泡或者捕获的路径。同时，沿途路过fiber节点时，根据事件名，从props中获取我们真正写在组件中的事件处理函数，push到路径中，等待下一步的批量执行。
    ```js
    export function accumulateSinglePhaseListeners(
      targetFiber: Fiber | null,
      reactName: string | null,
      nativeEventType: string,
      inCapturePhase: boolean,
      accumulateTargetOnly: boolean,
    ): Array<DispatchListener> {
      // 根据事件名来识别是冒泡阶段的事件还是捕获阶段的事件
      const captureName = reactName !== null ? reactName + 'Capture' : null;
      const reactEventName = inCapturePhase ? captureName : reactName;
      // 声明存放事件监听的数组
      const listeners: Array<DispatchListener> = [];
      // 找到目标元素
      let instance = targetFiber;
      let lastHostComponent = null;
    
      // 通过触发事件的fiber节点向上层遍历收集 `dom` 和 `listener`
      while (instance !== null) {
        const {stateNode, tag} = instance;
        // 只有 `HostComponents` 有 `listener` (i.e. <div>)
        if (tag === HostComponent && stateNode !== null) {
          lastHostComponent = stateNode;
    
          if (reactEventName !== null) {
            // 从fiber节点上的 `props` 中获取传入的事件 `listener` 处理函数
            const listener = getListener(instance, reactEventName);
            if (listener != null) {
              listeners.push({
                instance,
                listener,
                currentTarget: lastHostComponent,
              });
            }
          }
        }
        if (accumulateTargetOnly) {
          break;
        }
        // 继续向上
        instance = instance.return;
      }
      return listeners;
    }
    ```
  - 无论事件是在冒泡阶段执行，还是捕获阶段执行，都以同样的顺序`push`到`dispatchQueue`的`listeners`中，而冒泡或者捕获事件的执行顺序不同是由于清空`listeners`数组的顺序不同。
  - `注意，每次收集只会收集与事件源相同类型的事件`，比如子元素绑定了`onClick`，父元素绑定了`onClick`和`onClickCapture`:
- 合成事件对象如何参与到事件执行过程
  - 上面我们说过，`dispatchQueue`的结构如下面这样
    ```js
      [
        {
          event: SyntheticEvent,
          listeners: [ listener1, listener2, ... ]
        }
      ]
    ```
  - `event`就代表着合成事件对象，可以将它认为是这些`listeners`共享的一个事件对象。当清空`listeners`数组执行到每一个事件监听函数时，这个事件监听可以改变`event`上的`currentTarget`，也可以调用它上面的`stopPropagation`方法来阻止冒泡。`event`作为一个共享资源被这些事件监听消费，消费的行为发生在事件执行时。
### 事件执行
- 经过事件和事件对象收集的过程，得到了一条完整的事件执行路径，还有一个被共享的事件对象，之后进入到事件执行过程，从头到尾循环该路径，依次调用每一项中的监听函数。这个过程的重点在于事件冒泡和捕获的模拟，以及合成事件对象的应用，如下是从`dispatchQueue`中提取出事件对象和时间执行路径的过程。
  ```js
    export function processDispatchQueue(
      dispatchQueue: DispatchQueue,
      eventSystemFlags: EventSystemFlags,
    ): void {
      const inCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0;
      for (let i = 0; i < dispatchQueue.length; i++) {
  
        // 从dispatchQueue中取出事件对象和事件监听数组
        const {event, listeners} = dispatchQueue[i];
  
        // 将事件监听交由`processDispatchQueueItemsInOrder`去触发，同时传入事件对象供事件监听使用
        processDispatchQueueItemsInOrder(event, listeners, inCapturePhase);
      }
      // 捕获错误
      rethrowCaughtError();
    }
  ```
- 模拟冒泡和捕获:
  - 冒泡和捕获的执行顺序是不一样的，但是当初在收集事件的时候，无论是冒泡还是捕获，事件都是直接`push`到路径里的。那么执行顺序的差异是如何体现的呢？答案是循环路径的顺序不一样导致了执行顺序有所不同。首先回顾一下`dispatchQueue`中的`listeners`中的事件处理函数排列顺序：触发事件的目标元素的事件处理函数排在第一个，上层组件的事件处理函数依次往后排。
    ```javascript
      <div onClick={onClickParent}>
        父元素
        <div onClick={onClickChild}>
          子元素
        </div>
      </div>
      listeners: [ onClickChild, onClickParent ]
    ```
  - 从左往右循环的时候，目标元素的事件先触发，父元素事件依次执行，这与冒泡的顺序一样，那捕获的顺序自然是从右往左循环了。模拟冒泡和捕获执行事件的代码如下：
  - 其中判断事件执行阶段的依据`inCapturePhase`，它的来源在上面的透传,透传事件执行阶段标志的内容里已经提到过。
    ```js
      function processDispatchQueueItemsInOrder(
        event: ReactSyntheticEvent,
        dispatchListeners: Array<DispatchListener>,
        inCapturePhase: boolean,
      ): void {
        let previousInstance;
    
        if (inCapturePhase) {
          // 事件捕获倒序循环
          for (let i = dispatchListeners.length - 1; i >= 0; i--) {
            const {instance, currentTarget, listener} = dispatchListeners[i];
            if (instance !== previousInstance && event.isPropagationStopped()) {
              return;
            }
            // 执行事件，传入event对象，和currentTarget
            executeDispatch(event, listener, currentTarget);
            previousInstance = instance;
          }
        } else {
          // 事件冒泡正序循环
          for (let i = 0; i < dispatchListeners.length; i++) {
            const {instance, currentTarget, listener} = dispatchListeners[i];
            // 如果事件对象阻止了冒泡，则return掉循环过程
            if (instance !== previousInstance && event.isPropagationStopped()) {
              return;
            }
            executeDispatch(event, listener, currentTarget);
            previousInstance = instance;
          }
        }
      }
    ```
  - 至此，我们写在组件中的事件处理函数就被执行掉了，合成事件对象在这个过程中充当了一个公共角色，每个事件执行时，都会检查合成事件对象，有没有调用阻止冒泡的方法，另外会将当前挂载事件监听的元素作为`currentTarget`挂载到事件对象上，最终传入事件处理函数，我们得以获取到这个事件对象。
### 总结
- 由于fiber树的特点，一个组件如果含有事件的`prop`，那么将会在对应fiber节点的`commit`阶段绑定一个事件监听到`root`上，这个事件监听是持有优先级的，这将它和优先级机制联系了起来，可以把合成事件机制当作一个协调者，负责去协调合成事件对象、收集事件、触发真正的事件处理函数这三个过程。