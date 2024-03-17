- 👀  Slipping Tasks  👀
  collapsed:: true
	- query-sort-by:: Priority
	  query-sort-desc:: false
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	   #+BEGIN_QUERY
	   {
	     :title "⚠️ List all tasks that are not started and the scheduled date has passed, ordered by priority"
	   :query [
	   :find (pull ?h [*])
	   :in $ ?today
	   :where
	     [?h :block/marker ?marker]
	     [(contains? #{"NOW" "LATER" "TODO" "DOING" "WAIT" "WAITING"} ?marker)]
	     ;(or
	       ;(and
	         [?h :block/scheduled ?scheduled]
	         [(> ?scheduled ?today)]
	         ; [(contains? #{"LATER" "TODO" "WAIT" "WAITING"} ?marker)]
	       ;)
	          ;(and
	       ;  [?h :block/deadline ?deadline]
	       ;  [(< ?deadline ?today-2d)]
	       ;)
	     ;)
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
	- query-sort-by:: Priority
	  query-sort-desc:: false
	  query-properties:: [:Priority :Deadline :Scheduled :State :block]
	   #+BEGIN_QUERY
	   {
	   :title "🏁 List all tasks with a deadline in less than three days"
	   :query [
	   :find (pull ?h [*])
	   :in $ ?slipDate ?today
	   :where
	   [?h :block/marker ?marker]
	   [(contains? #{"NOW" "LATER" "TODO" "DOING" "WAIT" "WAITING"} ?marker)]
	    ;(and
	      [?h :block/deadline ?deadline]
	      [(< ?deadline ?slipDate)]
	      [(> ?deadline ?today)]
	    ;)
	   ]
	   :inputs [:+3d :today]
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
- ## 💤  Waiting  💤
  List all task in the "Waiting" state, ordered by deadline descending
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
  List all tasks labeled as #goals, ordered by deadline asc
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
  List all task in the "Doing" state, ordered by deadline descending
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
  List all tasks in the next 14 days, ordered by priority asc
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
  List all overdue task, ordered by deadline asc
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
  List all task with a priority, ordered by priority asc
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
  List all task, ordered by deadline descending
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
