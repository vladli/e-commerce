<script setup lang="ts"></script>

<template>
  <div>
    <Card>
      <template #title>Advanced Card</template>
      <template #subtitle>Card subtitle</template>
      <template #content>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </template>
      <template #footer>
        <div class="mt-1 flex gap-3">
          <Button
            class="w-full"
            icon="pi pi-search"
            label="Cancel"
            outlined
            severity="secondary"
          />
          <Button
            class="w-full"
            icon="pi pi-search"
            label="Save"
            @click="toast.success('Saved successfully!', { duration: 10000 })"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
