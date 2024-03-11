## List all unfinished tasks in a table (Excludes tasks with #Goals tag)

```clojure
- query-sort-by:: Deadline
  query-sort-desc:: true
  query-properties:: [:Priority :Deadline :Scheduled :State :Task]
  #+BEGIN_QUERY
  {
      :title "✅Tasks 🔥Overdue ⚠️Risk of slipping ‼️Important 💤Wait 🥇Goals 🟢Doing"
      :query [
          :find (pull ?h [*])
          ;:in $ ?day
          :where
              [?h :block/marker ?marker]
              [(contains? #{"NOW" "LATER" "TODO" "DOING" "WAIT" "WAITING"} ?marker)]
              ;[not(contains? #{"#Goals"})]
              ;(or
              ;    [?h :block/scheduled ?d] ; the block ?b has attribute scheduled with value ?d
              ;    [?h :block/deadline ?d]
              ;)
              ;[(< ?d ?day)]        ; the value ?d is smaller than the value ?day
      ]
      ;:inputs [:today]
      :result-transform (
          fn [result] (
              map (
                  fn [m] (
                      update m :block/properties (
                          fn [u] (
                              assoc u :Scheduled (
                                  get-in m [:block/scheduled]
                              )
                          )
                      )
                  )
              )
              (
                  map (
                      fn [m] (
                          update m :block/properties (
                              fn [u] (
                                  assoc u :Deadline (
                                      get-in m [:block/deadline]
                                  )
                              )
                          )
                      )
                  )(
                      map (
                          fn [m] (
                              update m :block/properties (
                                  fn [u] (
                                      assoc u :Priority (
                                          get-in m [:block/priority]
                                      )
                                  )
                              )
                          )
                      )(
                        map (
                            fn [m] (
                                update m :block/properties (
                                    fn [u] (
                                        assoc u :State (
                                            get-in m [:block/marker]
                                        )
                                    )
                                )
                            )
                        )(
                            map (
                            fn [m] (
                                update m :block/properties (
                                    fn [u] (
                                        assoc u :Task (
                                            get-in m [:block/content]
                                        )
                                    )
                                )
                            )
                        )
                            result
                        )
                      )
                  )
              )
          )
      )
      :group-by-page? false
      :collapsed? false
      :table-view? true
      :query-properties? [:block]
  }
  #+END_QUERY
```

List all tasks with a priority, order by priority
```clojure
- query-sort-by:: Priority
  query-sort-desc:: true
  query-properties:: [:Priority :Deadline :Scheduled :State :Task]
  #+BEGIN_QUERY
  {
      :title "🔺Priority Tasks"
      :query [
          :find (pull ?h [*])
          ;:in $ ?day
          :where
              [?h :block/marker ?marker]
              [(and
                (contains? #{"NOW" "LATER" "TODO" "DOING" "WAIT" "WAITING"} ?marker)
                (contains? #{"A" "B" "C"} ?priority)]
              ;[not(contains? #{"#Goals"})]
              ;(or
              ;    [?h :block/scheduled ?d] ; the block ?b has attribute scheduled with value ?d
              ;    [?h :block/deadline ?d]
              ;)
              ;[(< ?d ?day)]        ; the value ?d is smaller than the value ?day
      ]
      ;:inputs [:today]
      :result-transform (
          fn [result] (
              map (
                  fn [m] (
                      update m :block/properties (
                          fn [u] (
                              assoc u :Scheduled (
                                  get-in m [:block/scheduled]
                              )
                          )
                      )
                  )
              )
              (
                  map (
                      fn [m] (
                          update m :block/properties (
                              fn [u] (
                                  assoc u :Deadline (
                                      get-in m [:block/deadline]
                                  )
                              )
                          )
                      )
                  )(
                      map (
                          fn [m] (
                              update m :block/properties (
                                  fn [u] (
                                      assoc u :Priority (
                                          get-in m [:block/priority]
                                      )
                                  )
                              )
                          )
                      )(
                        map (
                            fn [m] (
                                update m :block/properties (
                                    fn [u] (
                                        assoc u :State (
                                            get-in m [:block/marker]
                                        )
                                    )
                                )
                            )
                        )(
                            map (
                            fn [m] (
                                update m :block/properties (
                                    fn [u] (
                                        assoc u :Task (
                                            get-in m [:block/content]
                                        )
                                    )
                                )
                            )
                        )
                            result
                        )
                      )
                  )
              )
          )
      )
      :group-by-page? false
      :collapsed? false
      :table-view? true
      :query-properties? [:block]
  }
  #+END_QUERY
```