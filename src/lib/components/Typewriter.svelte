<script lang="ts">
    interface $$Props {
        chars: string;
    }
    export let chars: string = "";
</script>

<div class="container">
    <div class="typed-out">{chars}</div>
</div>

<style lang="scss">
    .container {
        display: inline-block;
    }
    .typed-out {
        overflow: hidden;
        border-right: 0.15em solid #0095ff;
        white-space: nowrap;
        animation: typing 1s forwards;
        font-size: 1.6rem;
        width: 0;
        color: #0000c9;
    }
    @keyframes typing {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
</style>
