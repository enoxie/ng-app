import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  from,
  last,
  map,
  of,
} from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css'],
})
export class ObservableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Observable

    // const observable = new Observable<number>((subscriber) => {
    //   subscriber.next(1);
    //   subscriber.next(2);

    //   setTimeout(() => {
    //     subscriber.next(3);
    //     subscriber.complete();
    //   }, 1000);
    // });

    // const observer = {
    //   next: (value: any) => console.log(value),
    //   error: (err: any) => console.log(err),
    //   complete: () => console.log('bitti'),
    // };

    // observable.subscribe(observer);

    // Subject

    // const subject = new Subject<any>();

    // subject.subscribe((data) => console.log(data));
    // subject.subscribe((data) => console.log(data));
    // subject.subscribe((data) => console.log(data));

    // subject.next(1);
    // subject.next(2);

    // of(1, 2, 3)
    //   .pipe(map((x) => x * x))
    //   .subscribe((v) => console.log(`value: ${v}`));

    // From

    // from([1, 2, 3, 6, 8, 10])
    //   .pipe(last((x) => x % 11 == 0))
    //   .subscribe({
    //     next: (value) => console.log(value),
    //     error: (err) => console.log(err.message),
    //     complete: () => console.log('Bitti'),
    //   });

    // BehaviourSubject

    const behaviourSubject = new BehaviorSubject(-1);

    behaviourSubject.next(1);
    behaviourSubject.next(4);
    behaviourSubject.subscribe((data) => console.log(data));
    behaviourSubject.next(3);
  }
}
