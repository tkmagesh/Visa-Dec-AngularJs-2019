pubsub

//subscription
pubsub('evt1').subscribe(fn1)
pubsub('evt1').subscribe(fn2)
pubsub('evt1').subscribe([fn2, context])
pubsub('evt1').subscribe(fn1, fn2)

pubsub('evt2').subscribe(fn1, fn2)

//emit
pubsub('evt1').publish()
pubsub('evt1').publish('data1')
pubsub('evt1').publish('data1','data2')

//unsubscribe
pubsub('evt1').unsubscribe(fn1)
pubsub('evt1').unsubscribe(fn1, fn2)

//chaining
pubsub('evt1')
    .subscribe(fn1, fn2)
    .publish('data1) // fn1 & fn2 has to be invoked with 'data1'
    .unsubscribe(fn1)
    .publish('data2') // Only fn2 has to be invoked with 'data2'
