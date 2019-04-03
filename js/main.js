// creamos un componente, cada vez que llamemos a mensajeError insertará el contenido de template
Vue.component("mensaje-error", {
    template: '#plantilla-mensaje-error'
});

Vue.component('barra-progreso', {
    template: '#plantilla-barra-progreso',
    // atributo html
    props: ['porcentaje']
});

Vue.component('elemento-lista', {
    props: ['producto'],
    template: '#elemento-lista',
    methods: {
        cambiarEstilo() {
            // esto se manda a la instancia vue, a miApp, para ello en la etiqueta elemento-lista v-on:click-check="changeState" que es un método de miApp
            this.$emit("click-check")
        },
        eliminarItem() {
            this.$emit("click-delete")
        }
    }
});

const miApp = new Vue({
    // elemento principal, que vamos a manejar con vue
    el: '#main',
    // zona de variables
    data: {
        title: 'Lista de la compra con Vue.js', // esta variable la utilizamos para el h1 del index.html
        article: '',
        quantity: '0',
        priority: 'Baja',
        list: []
    },
    // esto lo hacemos para poder manipular los datos, y así calcular el porcentaje para la barra de progreso
    // estos datos son datos computados, datos generados a partir de otros
    computed: {
        // para ver cuantos objetos tiene estate = true, devolvemos aquellos que lo tengan a true
        // statesTrue realmente no es una funcion, es un dato(un array), que es dinámico
        statesTrue() {
            return this.list.filter((item) => item.estate)
        },
        percent() {
            // calculamos el porcentaje a partir de la longitud del array de elementos que devuelve statesTrue
            return ((this.statesTrue.length * 100) / this.list.length).toFixed();
        },
        percentX() {
            return this.percent.toString() + "%";
        }
    },
    methods: {
        addArticle() {
            // creamos un objeto, lo rellenamos con los valores del input, que recogemos a través de las variables definidas en data
            element = {
                article: this.article,
                quantity: this.quantity,
                priority: this.priority,
                // este campo era para controlar si el articulo esta comprado o no
                estate: false,
                id: Math.random().toString().substring(2, 9)
            };
            // ahora metemos el objeto creado en el array listado
            this.list.push(element);
            console.log(this.list);
            // llamamos a la función que pone los valores de nuevo por defecto, 'los limpia'
            this.resetInputs();
        },
        resetInputs() {
            this.article = '';
            this.quantity = 0;
            this.priority = 'Baja';
        },
        deleteElement(item) {
            //  método indexOf sobre el array para encontrar la posición del item que nos viene como parametro
            index = this.list.indexOf(item);
            // elimiamos el elemento basándonos en su índice-posición
            this.list.splice(index, 1);
        },
        changeState(item) {
            // cada vez que pulsamos en el icono del check, cambia el estado de false a true y viceversa
            item.estate = !item.estate;
        }
    },
});


/*
EJEMPLO USO DE filter

usuarios = [{nombre:"Paco", edad:40}, {nombre: "Maria", edad:88}, {nombre:"Boom", edad:44}];

nuevoArrayFiltrado = usuarios.filter((elemento) => elemento.edad > 40);

filter itera sobre el array que le indicamos, (cada elemento del array será elemento) y devuelve un nuevo array con la condicion que le pasamos (edad > 40)




*/