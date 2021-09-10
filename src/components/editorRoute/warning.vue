<template>
    <div :class="{hide}" class="alert h-12 bottom-10 right-10 rounded-2xl bg-red-200 absolute flex items-center gap-5 px-6">
        <p class="text-red-700">
            <slot></slot>
        </p>
        <button @click = "hide = true">x</button>
    </div>
</template>

<style lang="scss">
.alert{
    min-width: 200px;
    transition: 0.1s ease all;
}
.hide{
    opacity: 0;
}
</style>

<script>
export default {
    data(){
        return {
            hide : false,
        }
    },
    mounted(){
        setTimeout(()=>{
            this.hide = true;
        } , 5000)
    },
}
</script>