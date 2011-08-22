##
# Class what draw the context menu of the canvas box
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
class CanvasBoxMenu

    ##
    # Class Name
    # @type string
    ##
    strClassName: "CanvasBoxMenu"
    
    ##
    # Menu Border color
    # @type string
    ##
    menuBorderColor: "rgb( 100 , 100 , 200 )"

    ##
    # Menu Border width
    # @type integer
    ##
    menuBorderWidth: 1,

    ##
    # Menu Fill Color
    # @type string
    ##
    menuFillColor: "rgba( 230, 230, 240 , 0.7 )",

    ##
    # Menu Item Border color
    # @type string
    ##
    menuItemBorderColor: "rgb( 100 , 100 , 200 )",

    ##
    # Menu Item Border width
    # @type integer
    ##
    menuItemBorderWidth: 1,

    ##
    # Menu Item Fill Color
    # @type string
    ##
    menuItemFillColor: "rgba( 230, 230, 240 , 0.7 )",

    ##
    # Menu Item Text Color
    # @type string
    ##
    menuItemTextColor: "blue",

    ##
    # Menu Selected Item Text Color
    # @type string
    ##
    menuSelectedItemFillColor: "rgba( 230, 230, 140 , 0.7 )",

    ##
    # Menu X Position
    # @type integer
    ##
    intMenuX: 0,

    ##
    # Menu Y Position
    # @type integer
    ##
    intMenuY: 0,

    ##
    # Menu Item Border Width
    # @type integer
    ##
    intMenuItemXBorder: 3,

    ##
    # Menu Item Height
    # @type integer
    ##
    intMenuItemHeight: 20,

    ##
    # Menu Width
    # @type integer
    ##
    intMenuWidth: 110,

    ##
    # Menu Itens Collection
    # @type CanvasBoxMenuItem[]
    ##
    arrMenuItens: Array(),

    ##
    # Canvas Box Current Item
    # @type String
    ##
    strCurrentMenuItem: null,

    ##
    # Mouse X position
    #
    # @type Integer
    ##
    mouseX: 0,

    ##
    # Mouse Y position
    #
    # @type Integer
    ##
    mouseY: 0,

    ##
    # Canvas Box owner
    #
    # @type CanvasBox
    ##
    objBox: null,

    ##
    # Canvas Box Element owner
    #
    # @type CanvasBoxElement
    ##
    objParent: null,

    ##
    # Canvas Box menu child
    #
    # @type CanvasBoxMenu
    ##
    objOpenChildMenu: null,
    
    draw:->
        @strCurrentMenuItem = null;

        arrMenuKeys = php.array_keys( @arrMenuItens );
        @intMenuHeight = @intMenuItemHeight * ( arrMenuKeys.length - 1 );

        @objBox.setStrokeStyle( @menuBorderColor );
        @objBox.setLineWidth( @menuBorderWidth );
        @objBox.strokeRect(
            @intMenuX , @intMenuY, @intMenuWidth , @intMenuHeight
        );

        @objBox.setFillStyle( @menuFillColor );
        @objBox.fillRect(
            @intMenuX , @intMenuY, @intMenuWidth , @intMenuHeight
        );

        for strMenuKey , i in arrMenuKeys
            intMenuItemX = @intMenuX;
            intMenuItemY = @intMenuY + ( i ) * @intMenuItemHeight;

            @objBox.setStrokeStyle( @menuItemBorderColor );
            @objBox.setLineWidth( @menuItemBorderWidth );
            @objBox.strokeRect(
                intMenuItemX , 
                intMenuItemY , 
                @intMenuWidth , 
                @intMenuItemHeight 
            );

            if      ( @mouseX > intMenuItemX ) &&
                    ( @mouseX < ( intMenuItemX + @intMenuWidth ) ) &&
                    ( @mouseY > intMenuItemY ) &&
                    ( @mouseY < ( intMenuItemY + @intMenuItemHeight ) )
                @objBox.setFillStyle( @menuSelectedItemFillColor );
                @strCurrentMenuItem = strMenuKey;
            else
                @objBox.setFillStyle( @menuItemFillColor );

            @objBox.fillRect(
                intMenuItemX , intMenuItemY, @intMenuWidth , @intMenuItemHeight
            );

            @objBox.setFillStyle(
                @arrMenuItens[ strMenuKey ].backgroundColor ? @menuItemTextColor 
            );
            @objBox.setLineWidth( 0.9 );
            @objBox.setFont( "10px Times New Roman" );
            @objBox.setTextAlign( "left" );
            @objBox.fillText(
                @arrMenuItens[ strMenuKey ].name ,
                @intMenuItemXBorder +  intMenuItemX ,
                Math.round( intMenuItemY +   @intMenuItemHeight / 2 )
            );

        if( @objOpenChildMenu? )
            @objOpenChildMenu.mouseX = @mouseX;
            @objOpenChildMenu.mouseY = @mouseY;
            @objOpenChildMenu.draw();

    onClick:( event )->
        booReturn = false;
        if( @strCurrentMenuItem? )
            funcEvent = @arrMenuItens[ @strCurrentMenuItem ].event;
            if( ! Object.isUndefined( funcEvent ) && Object.isFunction( funcEvent ) )
                @arrMenuItens[ @strCurrentMenuItem ].key = @strCurrentMenuItem;
                booReturn = funcEvent( @objParent  , @arrMenuItens[ @strCurrentMenuItem ] , this );

        if( not booReturn && @objOpenChildMenu? )
            @objOpenChildMenu.mouseX = @mouseX;
            @objOpenChildMenu.mouseY = @mouseY;
            booReturn = @objOpenChildMenu.onClick( event );

        if( not booReturn )
            @strCurrentMenuItem = null;
            @objOpenChildMenu = null;
        
        return booReturn;

    createChildMenu:( objMenuItem , arrMenuItens )->
        objChildMenu = new autoload.newCanvasBoxMenu();
        objChildMenu.objBox = @objBox;
        objChildMenu.intMenuWidth = @intMenuWidth;
        objChildMenu.intMenuX = @intMenuX + @intMenuWidth + 1;
        objChildMenu.intMenuY = @intMenuY + @intMenuItemHeight * objMenuItem.key;
        objChildMenu.intMenuItemXBorder = @intMenuItemXBorder;
        objChildMenu.arrMenuItens = arrMenuItens;
        objChildMenu.intMenuItemHeight = @intMenuItemHeight;
        objChildMenu.objParent = @objParent;
        @objOpenChildMenu = objChildMenu;
        return true;
