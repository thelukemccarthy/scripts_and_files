- TODO [#A] task 1 #Goals
- TODO task 2 #important
  DEADLINE: <2024-03-13 Wed>
  SCHEDULED: <2024-03-13 Wed>
- collapsed:: true
  #+BEGIN_QUERY
  {
    :title "📅 NEXT"
    :query [
      :find (pull ?b [*])
      :in $ ?start ?next
      :where
        (task ?b #{"NOW" "LATER" "TODO" "DOING"})
        (between ?b ?start ?next)
    ]
    :inputs [:today :+10d]
    :collapsed? false}
  #+END_QUERY
-
- List all tasks in the next 10 days
- query-sort-by:: Priority
  query-sort-desc:: false
  query-properties:: [:Priority :Deadline :Scheduled :State :block]
  #+BEGIN_QUERY
  {
  :title "📅 Next Tasks 📅"
  :query [:find (pull ?b [*])
  :in $ ?start ?next
  :where
  (task ?b #{"NOW" "LATER" "TODO" "DOING"})
  (between ?b ?start ?next)]
  :inputs [:today :+10d]
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
- List all tasks labeled #important, order by priority asc
- query-sort-by:: Deadline
  query-sort-desc:: false
  query-properties:: [:Priority :Deadline :Scheduled :State :block]
  #+BEGIN_QUERY
  {
  :title "‼️ Important Tasks  ‼️"
  :query [:find (pull ?b [*])
  :where
    (task ?b #{"NOW" "LATER" "DOING" "TODO"})
    [?b :block/page ?p]
    [?r :block/original-name "important"]
    (or [?b :block/path-refs ?r]
    [?p :block/tags ?r])
  ]
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
-
- List all overdue task, order by deadline asc
- query-sort-by:: Deadline
  query-sort-desc:: false
  query-properties:: [:Priority :Deadline :Scheduled :State :block]
  #+BEGIN_QUERY
  {
  :title "🔥 Overdue Tasks  🔥"
  :query [
  :find (pull ?h [*])
  :in $ ?today
  :where
    [?h :block/marker ?marker]
    [(contains? #{"NOW" "LATER" "TODO" "DOING" "WAIT" "WAITING"} ?marker)]
    ;[not(contains? #{"#Goals"})]
    (or
        [?h :block/scheduled ?d] ; the block ?b has attribute scheduled with value ?d
        [?h :block/deadline ?d]
    )
    [(< ?d ?today)]        ; the value ?d is smaller than the value ?day
  ]
  :inputs [:today]
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
- List all task with a priority, order by priority asc 
  N.B. currently displays the LOGBOOK, Deadline and Scheduled properties in the Task column. I want 
  to remove these values from that column but haven't figured out how do that yet
- query-sort-by:: Priority
  query-sort-desc:: false
  query-properties:: [:Priority :Deadline :Scheduled :State :block]
  #+BEGIN_QUERY
  {
  :title "🔺 Priority Tasks  🔺"
  :query [
  :find (pull ?h [*])
  ;:in $ ?day
  :where
    [?h :block/marker ?marker]
    [(contains? #{"NOW" "LATER" "TODO" "DOING" "WAIT" "WAITING"} ?marker)]
    [?h :block/priority ?priority]
    [(contains? #{"A" "B" "C"} ?priority)]
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
-
- test
-
- TODO [#B] task 2
- TODO [#C] task 3
  DEADLINE: <2024-03-08 Fri>
- TODO [#A] task 4
-
-
-