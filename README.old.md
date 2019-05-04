# marvel-master-detail

It follow the Container/Presentational principle.
The container component is the one that carries all the logic: 
functions for handling state changes, internal component state and so on.

In contrast a presentational component is merely used for displaying the intended markup. 
Presentational components are plain JavaScript functions receiving data from the container component as props.

Presentational components design:
-   SuperheroList : A list showing superheroes
        - heroes: Array { id, text, completed }.
        - onTodoClick(id: hero)

-   SuperheroDetail : A section containing a detailed superhero
        -
        -
Container components design:

