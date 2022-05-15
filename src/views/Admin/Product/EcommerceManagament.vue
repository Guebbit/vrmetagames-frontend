<template>
    <div id="product-management-page" class="theme-page">
        <h1>ProductManagementPage</h1>
        colonne = stations + cestino\sospesi?
        draggable = videgames
        creazione, editing

        <div class="flex justify-center">
            <div class="min-h-screen flex overflow-x-scroll py-12">
                <div
                    v-for="column in columns"
                    :key="column.title"
                    class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
                >
                    <p
                        class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
                    >
                        {{ column.title }}
                    </p>
                    <draggable
                        :list="column.tasks"
                        :animation="200"
                        ghost-class="ghost-card"
                        group="tasks"
                    >
                        <template #item="{ element }">
                            <div class="test">
                                <pre>{{ element }}</pre>
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
    name: "ProductManagementPage",

    components: {
        draggable
    },

    data: () => {
        return {
            // https://codesandbox.io/s/animated-draggable-kanban-board-with-tailwind-and-vue-1ry0p?ref=madewithvuejs.com&file=/src/App.vue
            columns: [
                {
                    title: "Backlog",
                    tasks: [
                        {
                            id: 1,
                            title: "Add discount code to checkout page",
                            date: "Sep 14",
                            type: "Feature Request"
                        },
                        {
                            id: 2,
                            title: "Provide documentation on integrations",
                            date: "Sep 12"
                        },
                        {
                            id: 3,
                            title: "Design shopping cart dropdown",
                            date: "Sep 9",
                            type: "Design"
                        },
                        {
                            id: 4,
                            title: "Add discount code to checkout page",
                            date: "Sep 14",
                            type: "Feature Request"
                        },
                        {
                            id: 5,
                            title: "Test checkout flow",
                            date: "Sep 15",
                            type: "QA"
                        }
                    ]
                },
                {
                    title: "In Progress",
                    tasks: [
                        {
                            id: 6,
                            title: "Design shopping cart dropdown",
                            date: "Sep 9",
                            type: "Design"
                        },
                        {
                            id: 7,
                            title: "Add discount code to checkout page",
                            date: "Sep 14",
                            type: "Feature Request"
                        },
                        {
                            id: 8,
                            title: "Provide documentation on integrations",
                            date: "Sep 12",
                            type: "Backend"
                        }
                    ]
                },
                {
                    title: "Review",
                    tasks: [
                        {
                            id: 9,
                            title: "Provide documentation on integrations",
                            date: "Sep 12"
                        },
                        {
                            id: 10,
                            title: "Design shopping cart dropdown",
                            date: "Sep 9",
                            type: "Design"
                        },
                        {
                            id: 11,
                            title: "Add discount code to checkout page",
                            date: "Sep 14",
                            type: "Feature Request"
                        },
                        {
                            id: 12,
                            title: "Design shopping cart dropdown",
                            date: "Sep 9",
                            type: "Design"
                        },
                        {
                            id: 13,
                            title: "Add discount code to checkout page",
                            date: "Sep 14",
                            type: "Feature Request"
                        }
                    ]
                },
                {
                    title: "Done",
                    tasks: [
                        {
                            id: 14,
                            title: "Add discount code to checkout page",
                            date: "Sep 14",
                            type: "Feature Request"
                        },
                        {
                            id: 15,
                            title: "Design shopping cart dropdown",
                            date: "Sep 9",
                            type: "Design"
                        },
                        {
                            id: 16,
                            title: "Add discount code to checkout page",
                            date: "Sep 14",
                            type: "Feature Request"
                        }
                    ]
                }
            ]
        };
    },

});
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

#product-management-page{
    //
}

.test {
    cursor: grab;
    padding: 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>