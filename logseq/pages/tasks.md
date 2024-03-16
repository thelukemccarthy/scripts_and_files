- ## 💤  Waiting  💤
  collapsed:: true
  List all task in the "Waiting" state, sorted by deadline descending
	- query-sort-by:: Deadline
	  query-sort-desc:: true
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	  #+BEGIN_QUERY
	  {
	      :query [
	          :find (pull ?h [*])
	          ;:in $ ?day
	          :where
	              [?h :block/marker ?marker]
	              [(contains? #{"WAIT" "WAITING"} ?marker)]
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
- ## 🥇  Goals  🥇
  collapsed:: true
  List all tasks labeled as #goals, order by deadline asc
	- query-sort-by:: Deadline
	  query-sort-desc:: false
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	  #+BEGIN_QUERY
	  {
	  :query [:find (pull ?b [*])
	  :where
	    [?b :block/marker ?marker]
	    [(contains? #{"NOW" "LATER" "TODO" "DOING" "WAIT" "WAITING"} ?marker)]
	    [?b :block/page ?p]
	    [?r :block/original-name "Goals"]
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
- ## 🟢  Doing  🟢
  collapsed:: true
  List all task in the "Doing" state, sorted by deadline descending
	- query-sort-by:: Deadline
	  id:: 65f347b4-820b-431a-9f62-d712a005eb49
	  query-sort-desc:: true
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	  #+BEGIN_QUERY
	  {
	      :query [
	          :find (pull ?h [*])
	          ;:in $ ?day
	          :where
	              [?h :block/marker ?marker]
	              [(contains? #{"NOW" "DOING"} ?marker)]
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
- ## 📅  Next Tasks  📅
  collapsed:: true
  List all tasks in the next 14 days, order by priority asc
	- query-sort-by:: Priority
	  query-sort-desc:: false
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	  #+BEGIN_QUERY
	  {
	  :query [:find (pull ?b [*])
	  :in $ ?from ?until
	  :where
	    [?b :block/marker ?marker]
	    [(contains? #{"NOW" "LATER" "TODO" "DOING" "WAIT" "WAITING"} ?marker)] 
	    (or
	      [?b :block/scheduled ?dateSet]
	      [?b :block/deadline ?dateSet]
	    )
	       [(> ?dateSet ?from)]  
	       [(< ?dateSet ?until)]
	  ]
	  :inputs [:today :+14d]
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
	                          get-in m [:block]
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
- ## ‼️  Important Tasks  ‼️
  collapsed:: true
  List all tasks labeled #important, order by deadline asc
	- query-sort-by:: Deadline
	  query-sort-desc:: false
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	  #+BEGIN_QUERY
	  {
	  :query [:find (pull ?b [*])
	  :where
	    [?b :block/marker ?marker]
	    [(contains? #{"NOW" "LATER" "TODO" "DOING" "WAIT" "WAITING"} ?marker)]
	    (task ?b #{"NOW" "LATER" "DOING" "TODO" "WAIT" "WAITING"})
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
- ## 🔥 Overdue Tasks  🔥
  collapsed:: true
  List all overdue task, order by deadline asc
	- query-sort-by:: Deadline
	  query-sort-desc:: false
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	  #+BEGIN_QUERY
	  {
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
-
- ## 🔺 Priority Tasks 🔺
  collapsed:: true
  List all task with a priority, order by priority asc
	- query-sort-by:: Priority
	  query-sort-desc:: false
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	  #+BEGIN_QUERY
	  {
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
- ## ✅  All Tasks  ✅
  collapsed:: true
  List all task, sorted by deadline descending
	- query-sort-by:: Deadline
	  query-sort-desc:: true
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	  #+BEGIN_QUERY
	  {
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