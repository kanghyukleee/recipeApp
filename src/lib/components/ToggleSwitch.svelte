

<label class="switch">
  <input class='switch-icon' type="checkbox" role="switch">
  <span><slot /></span>
</label>


<style lang="scss">
  .switch {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 10px;
    cursor: pointer;
    .switch-icon {
      appearance: none;
      position: relative;
      border: max(2px, 0.1em) solid gray;
      border-radius: 1.25em;
      width: 2.25em;
      height: 1.25em;
    }
    [type="checkbox"]::before {
      content: "";
      position: absolute;
      left: 0;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      transform: scale(0.8);
      background-color: gray;
      transition: left 120ms linear;
    }
    [type="checkbox"]:checked::before {
      background-color: white;
      left:1em;
    }
    [type="checkbox"]:checked {
      background-color: var(--accent-color);
      border-color: var(--accent-color);
    }
    
  }
</style>