const rows=document.querySelectorAll('.row');
const tierContainer = document.querySelector('.tier');
const addButton=document.querySelector('.add-tier-button');
const resetbutton=document.querySelector('.reset-tier-button');
const saveButton=document.querySelector('.save-tier-button');
const itemsSection=document.querySelector('.selector-items');

let draggedElement=null;
let sourceContainer=null;

//create img item
function createElementImg(src){
     const imgElement=document.createElement('img');
     imgElement.draggable=true;//drag on
     imgElement.src=src;
     imgElement.className='item-image';
     
     //add events to drag and drop
     imgElement.addEventListener('dragstart',handleDragStart);
     imgElement.addEventListener('dragend',handleDragEnd);

     itemsSection.appendChild(imgElement);

     return imgElement;
}

//load files
function loadFiles(files){
     if (files && files.length>0) {
          Array.from(files).forEach(file=>{

               const reader=new FileReader();

               reader.onload=evReader=>{//when load create img element and set the src and classname
                    createElementImg(evReader.target.result);
               };

               reader.readAsDataURL(file);
          });
     }
}

//when select the img item
function handleDragStart(e){
     draggedElement=e.target;
     sourceContainer=draggedElement.parentNode;
     e.dataTransfer.setData('text/plain', draggedElement.src);//send src
}

//when not select the img item
function handleDragEnd(){
     draggedElement=null;
     sourceContainer=null;
}

//drop img
function handleDrop(e){
     e.preventDefault();
     const {currentTarget,dataTransfer}=e;

     if (sourceContainer && draggedElement) {
          sourceContainer.removeChild(draggedElement);
     }

     if (draggedElement) {
          const src=dataTransfer.getData('text/plain'); //get src
          const imgElement=createElementImg(src);
          currentTarget.appendChild(imgElement);
     }

     currentTarget.classList.remove('drag-over');
     currentTarget.querySelector('.drag-preview')?.remove();
}

//over img in one row
function handleDragOver(e){
     e.preventDefault();

     const {currentTarget,dataTransfer}=e;
     if (sourceContainer===currentTarget) return;

     currentTarget.classList.add('drag-over');

     const dragPreview=document.querySelector('.drag-preview');

     if (draggedElement  && !dragPreview) {
          const previewElment=draggedElement.cloneNode(true);
          previewElment.classList.add('drag-preview');
          currentTarget.appendChild(previewElment);
     }
}

//when img leave the row
function handleDragLeave(e){
     e.preventDefault();
     const {currentTarget}=e;

     currentTarget.classList.remove('drag-over');
     currentTarget.querySelector('.drag-preview')?.remove();
}

//drop from desktop
function handleDragOverFromDesktop(e){
     e.preventDefault();
     const {currentTarget,dataTransfer}=e;

     if (dataTransfer.types.includes('Files')) {
          currentTarget.classList.add('drag-files');
     }
}

//check come from desktop
function handleDropFromDesktop(e){
     e.preventDefault();
     const {currentTarget,dataTransfer}=e;

     if (dataTransfer.types.includes('Files')) {
          const {files}=dataTransfer;
          loadFiles(files);
     }
     currentTarget.classList.remove('drag-files');
}

//addevents to all rows
rows.forEach(row=>{
     row.addEventListener('drop',handleDrop);
     row.addEventListener('dragover',handleDragOver);
     row.addEventListener('dragleave',handleDragLeave);
});

//item section have same events of the rows
itemsSection.addEventListener('drop',handleDrop);
itemsSection.addEventListener('dragover',handleDragOver);
itemsSection.addEventListener('dragleave',handleDragLeave);
//when don't use add button file, directly from desktop 
itemsSection.addEventListener('drop',handleDropFromDesktop);
itemsSection.addEventListener('dragover',handleDragOverFromDesktop);

//event to input file
addButton.addEventListener('change',e=>{
     const {files}=e.target; //get or not the files type image

     loadFiles(files);
});

//reset button event
resetbutton.addEventListener('click',()=>{
     const items=document.querySelectorAll('.tier .item-image');
     items.forEach(item=>{
          item.remove();
          itemsSection.appendChild(item);
     });
});

//save button
saveButton.addEventListener('click',()=>{
     const canvas = document.createElement('canvas');
     const ctx = canvas.getContext('2d');

     import('https://cdn.jsdelivr.net/npm/html2canvas-pro@1.5.8/+esm')
     .then(({default:html2canvas})=>{
          html2canvas(tierContainer).then(canvas=>{
          ctx.drawImage(canvas,0,0);
          const imgURL=canvas.toDataURL('image/png');

          const downloadLink=document.createElement('a');
          downloadLink.download='tier.png';
          downloadLink.href=imgURL;
          downloadLink.click();
          });
     });
});