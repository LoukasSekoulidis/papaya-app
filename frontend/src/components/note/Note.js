import React from 'react'

export default function Note(title, content) {
  return (
    <li>
        <div class="card w-50">
          <div class="card-body">
                  <h5 class="card-title">{title}</h5>
                  <p class="card-text">{content}</p>
          </div>
      </div>
    </li>
  )
}
